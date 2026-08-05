import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

export async function POST (_req : NextRequest) {
    const {filmInput} = await _req.json()
    const message = await client.messages.create({
    max_tokens: 1024,
    messages: [{ content: filmInput, role: 'user' }],
    model: 'claude-sonnet-4-6',
    system : '"You are a film twist analyst. Given a film name or plot description, analyze the twist, explain why it works psychologically, and predict possible twists if not known."'
    });
    return Response.json({
        message : message.content[0].type === 'text' ? message.content[0].text : ''
    })
}