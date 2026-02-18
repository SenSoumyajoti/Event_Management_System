import json
from openai import OpenAI
import requests
from dotenv import load_dotenv
import os,logging
from . import models
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model, authenticate, login, logout
from django.utils.decorators import method_decorator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.template.loader import render_to_string
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.dateparse import parse_datetime
from django.utils import timezone



User = get_user_model()

# ---------- register ----------
@csrf_exempt
def RegisterView(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    try:
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username') or data.get('email')
        email = data.get('email')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'error': 'username and password required'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        refresh = RefreshToken.for_user(user)
        return JsonResponse({
            'id': user.id,
            'username': user.username,
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        })
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# ---------- login ----------

@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        try:
            # Parse JSON data
            data = json.loads(request.body.decode('utf-8'))
            username = data.get('username')
            password = data.get('password')
            
            # Validate required fields
            if not all([username, password]):
                return JsonResponse({'error': 'Username and password required'}, status=400)
            
            # Authenticate user
            user = authenticate(request, username=username, password=password)
            if not user:
                return JsonResponse({'error': 'Invalid credentials'}, status=401)
            
            # Login user (sets session cookie)
            login(request, user)
            
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                'id': user.id,
                'username': user.username,
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'message': 'Login successful'
            })
            
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)

# ---------- logout ----------
@csrf_exempt
def logout_user(request):
    try:
        # Accept POST or GET
        logout(request)
        return JsonResponse({'status': 'success', 'message': 'Logged out'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


# ---------- profile ----------
@csrf_exempt
def profile(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not authenticated'}, status=401)
    return JsonResponse({
        'id': request.user.id,
        'username': request.user.username,
        'email': request.user.email,
    })


# ---------- reset password ----------~
@csrf_exempt
def send_password_reset_email(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

    try:
        data = json.loads(request.body)
        email = (data.get('email') or '').strip()
    except Exception:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

    # Generic response for security (do not reveal if email exists)
    success_response = JsonResponse({'message': 'If this email exists, a reset link has been sent'}, status=200)
    if not email:
        return success_response

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return success_response

    try:
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = f"{request.build_absolute_uri('/')[:-1]}/reset-password/{uid}/{token}/"

        subject = "Password Reset Request"
        # try to render template, fall back to plain text
        try:
            message = render_to_string('email/password_reset_email.html', {'user': user, 'reset_url': reset_url})
            html_message = message
        except Exception:
            message = f"Use this link to reset your password: {reset_url}"
            html_message = None

        try:
            send_mail(subject, message, 'noreply@eventSphere.com', [user.email], fail_silently=False, html_message=html_message)
        except Exception as mail_err:
            logger.exception("Error sending password reset email")
            # Do NOT return 500; return success to avoid leaking info and avoid failing frontend
            return success_response

        return success_response

    except Exception as e:
        logger.exception("Unexpected error in password reset")
        return JsonResponse({'error': 'Internal server error'}, status=500)
    
# ---------event ideas-------


load_dotenv()
logger = logging.getLogger(__name__)

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

@csrf_exempt
def generate_ideas(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        prompt = """Generate 3 creative event ideas with:
        - Catchy name
        - 1-sentence description
        - Target audience
        Format as a numbered list.
        """

        response = client.chat.completions.create(
            model="deepseek/deepseek-r1:free",   # model name
            messages=[
                {"role": "system", "content": "You are a creative event planner."},
                {"role": "user", "content": prompt}
            ]
        )

        ideas = response.choices[0].message.content.strip()
        return JsonResponse({'status': 'success', 'ideas': ideas})

    except Exception as e:
        logger.exception("Error in generate_ideas")  # <-- log stacktrace
        return JsonResponse({'status': 'error', 'message': str(e)}, status=500)



#---------------------------- profile  ------------------------------------

@csrf_exempt
def show_events_list(request):
    if request.method !='GET':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    


#--------------------------- Search functionality -----------------------------

@csrf_exempt
def serach_function(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'method not allowed !'},status =405)
    