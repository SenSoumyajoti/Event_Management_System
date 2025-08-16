import React, { useEffect, useState } from 'react';
import OpenAI from 'openai';

const apiKey = import.meta.env.API_KEY_OPEN;

const client = new OpenAI({ apiKey, dangerouslyAllowBrowser: true }); // Browser use is NOT recommended for secret keys

const Emni = () => {
  const [story, setStory] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await client.chat.completions.create({
          model: 'gpt-4',
          messages: [
            { role: 'user', content: 'Write a one-sentence bedtime story about a unicorn.' }
          ],
        });

        setStory(response.choices[0].message.content);
      } catch (err) {
        console.error('Error fetching story:', err);
        setStory('Failed to load story.');
      }
    };

    fetchStory();
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {story || 'Loading...'}
    </div>
  );
};

export default Emni;
