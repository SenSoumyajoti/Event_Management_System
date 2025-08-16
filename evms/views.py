import json
import openai
import requests
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


# ---------- reset password ----------
@csrf_exempt
def send_password_reset_email(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email')
        
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Don't reveal whether email exists for security
            return JsonResponse({'message': 'If this email exists, a reset link has been sent'}, status=200)
        
        # Generate token and UID
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Build reset link
        reset_url = f"{request.build_absolute_uri('/')[:-1]}/reset-password/{uid}/{token}/"
        
        # Email content
        subject = "Password Reset Request"
        message = render_to_string('email/password_reset_email.html', {
            'user': user,
            'reset_url': reset_url,
        })
        
        # Send email
        send_mail(
            subject,
            message,
            'noreply@eventSphere.com',
            [user.email],
            fail_silently=False,
            html_message=message
        )
        
        return JsonResponse({'message': 'Password reset link has been sent to your email'}, status=200)
    
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
# ---------event ideas-------
@csrf_exempt
def generate_ideas(request):
    """
    ChatGPT-powered event idea generator
    Returns 3 formatted event ideas using OpenAI API
    """
    try:
        # 1. Define the prompt
        prompt = """Generate 3 creative event ideas with:
        - Catchy name
        - 1-sentence description
        - Target audience
        Format as a numbered list."""
        
        # 2. Call ChatGPT API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a creative event planner."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,  # Controls creativity (0-2)
            max_tokens=300    # Limit response length
        )
        
        # 3. Extract and return the ideas
        ideas = response.choices[0].message['content']
        return JsonResponse({
            'status': 'success',
            'ideas': ideas
        })
        
    except Exception as e:
        return JsonResponse({
            'status': 'error',
            'message': str(e)
        }, status=500)