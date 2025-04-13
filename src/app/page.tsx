'use client';

import AIDiagnosisComponent from '@/components/ai-diagnosis';
import AIPrescriptionComponent from '@/components/ai-prescription';
import MedicalInfoRetrievalComponent from '@/components/medical-info-retrieval';
import SymptomCheckerComponent from '@/components/symptom-checker';
import {Card, CardContent} from '@/components/ui/card';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {useEffect, useState} from 'react';
import {Home, Lightbulb, MessageSquare} from 'lucide-react';

const Page = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'MediZen';
  }, []);

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'symptom-checker':
        return <SymptomCheckerComponent />;
      case 'medical-info':
        return <MedicalInfoRetrievalComponent />;
      case 'ai-diagnosis':
        return <AIDiagnosisComponent />;
      case 'ai-prescription':
        return <AIPrescriptionComponent />;
      default:
        return (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground mb-4">
                Select a tool from the sidebar to start.
              </p>
              <div className="text-center">
                <blockquote className="text-lg font-semibold italic text-accent-foreground">
                  "The greatest medicine of all is teaching people how not to need it."
                </blockquote>
                <figcaption className="mt-2 text-sm text-muted-foreground">
                  - Hippocrates
                </figcaption>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

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
                  <SidebarMenuButton
                    onClick={() => {
                      setActiveComponent(null);
                    }}
                  >
                    <Home />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setActiveComponent('symptom-checker')}>
                    <Lightbulb />
                    <span>Symptom Checker</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setActiveComponent('medical-info')}>
                    <MessageSquare />
                    <span>Medical Info</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setActiveComponent('ai-diagnosis')}>
                    <Lightbulb />
                    <span>AI Diagnosis</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setActiveComponent('ai-prescription')}>
                    <MessageSquare />
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
      <main className="flex-1 p-4">
        {renderActiveComponent()}
      </main>
    </SidebarProvider>
  );
};

export default Page;
