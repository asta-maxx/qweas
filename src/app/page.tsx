'use client';

import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider} from '@/components/ui/sidebar';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import SymptomCheckerComponent from "@/components/symptom-checker";
import MedicalInfoRetrievalComponent from "@/components/medical-info-retrieval";
import AIDiagnosisComponent from "@/components/ai-diagnosis";
import AIPrescriptionComponent from "@/components/ai-prescription";
import {Home} from "lucide-react";

const Page = () => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'MediZen';
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'symptom-checker':
        return <SymptomCheckerComponent/>;
      case 'medical-info':
        return <MedicalInfoRetrievalComponent/>;
      case 'ai-diagnosis':
        return <AIDiagnosisComponent/>;
      case 'ai-prescription':
        return <AIPrescriptionComponent/>;
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Welcome to MediZen</CardTitle>
              <CardDescription>Select an option from the sidebar to get started.</CardDescription>
            </CardHeader>
            <CardContent>
              Explore the AI-powered medical tools to assist with your health inquiries.
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
                  <SidebarMenuButton onClick={() => setSelectedComponent(null)}>
                    <Home/>
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedComponent('symptom-checker')}>
                    <span>Symptom Checker</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedComponent('medical-info')}>
                    <span>Medical Info</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedComponent('ai-diagnosis')}>
                    <span>AI Diagnosis</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={() => setSelectedComponent('ai-prescription')}>
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
        {renderComponent()}
      </main>
    </SidebarProvider>
  );
};

export default Page;
