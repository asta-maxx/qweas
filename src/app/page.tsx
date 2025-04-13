'use client';

import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider} from '@/components/ui/sidebar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useRef, useState} from 'react';
import SymptomCheckerComponent from "@/components/symptom-checker";
import MedicalInfoRetrievalComponent from "@/components/medical-info-retrieval";
import AIDiagnosisComponent from "@/components/ai-diagnosis";
import AIPrescriptionComponent from "@/components/ai-prescription";
import {Home} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

const Page = () => {
  const [messages, setMessages] = useState<{ role: string; content: string; }[]>([]);
  const [input, setInput] = useState('');
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'MediZen';
  }, []);

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }]);
      // Simulate AI response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, {
          role: 'assistant',
          content: 'This is a simulated response from the AI. ' +
            'Please note that this is not a real medical advice.'
        }]);
      }, 500);
      setInput('');
    }
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h2>MediZen</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setMessages([])}>
                    <Home/>
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Symptom Checker</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>Medical Info</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>AI Diagnosis</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <span>AI Prescription</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="text-center text-xs">
            Disclaimer: This app provides information for educational purposes only and does not
            constitute medical advice. Always consult with a qualified healthcare professional for
            any health concerns or before making any decisions related to your health or treatment.
          </p>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4 flex flex-col h-screen">
        <div ref={chatAreaRef} className="flex-1 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'}`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <Textarea
            placeholder="Enter your message here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-l-md border-r-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} className="rounded-l-none">Send</Button>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Page;
