// app/api/generator/route.js
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request) {
  try {
    const { text, voiceId, model } = await request.json();
    
    if (!text || !voiceId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const response = await axios({
      method: 'POST',
      url: `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      data: {
        text,
        model_id: model || 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      },
      responseType: 'arraybuffer'
    });

    const audioBuffer = Buffer.from(response.data);
    
    // Create a new response with appropriate headers
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString()
      }
    });
  } catch (error) {
    console.error('Error converting text to speech:', error.response?.data || error.message);
    return NextResponse.json(
      { 
        error: 'Error converting text to speech',
        details: error.response?.data || error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}