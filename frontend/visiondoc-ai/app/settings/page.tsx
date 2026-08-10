"use client";

import { useEffect, useState } from "react";
import { Bell, Globe, Moon, Save } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { DEFAULT_API_BASE_URL } from "@/lib/constants";
import { getApiBaseUrl, setApiBaseUrl } from "@/services/api";

export default function SettingsPage() {
  const [baseUrl, setBaseUrl] = useState(DEFAULT_API_BASE_URL);
  const [saved, setSaved] = useState(false);

  // Dummy, non-persisted notification toggles for demonstration purposes.
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [analysisAlerts, setAnalysisAlerts] = useState(true);

  useEffect(() => {
    setBaseUrl(getApiBaseUrl());
  }, []);

  const handleSave = () => {
    setApiBaseUrl(baseUrl.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure your backend connection and workspace preferences.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">API Configuration</CardTitle>
          </div>
          <CardDescription>
            The FastAPI backend URL that the dashboard sends X-ray images to.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="api-base-url">Backend base URL</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="api-base-url"
                value={baseUrl}
                onChange={(event) => setBaseUrl(event.target.value)}
                placeholder="http://127.0.0.1:8000"
                className="sm:flex-1"
              />
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                {saved ? "Saved" : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Requests are sent to <code className="rounded bg-secondary px-1 py-0.5">{baseUrl}/predict/</code>. Make sure CORS is enabled on your FastAPI server for this origin.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Appearance</CardTitle>
          </div>
          <CardDescription>Personalize how VisionDoc AI looks.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Dark mode</p>
              <p className="text-xs text-muted-foreground">
                Switch to a low-light color theme.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="muted">Coming soon</Badge>
              <Switch checked={false} onCheckedChange={() => {}} disabled />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            <CardTitle className="text-base">Notifications</CardTitle>
          </div>
          <CardDescription>
            Choose what you want to be notified about.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Email notifications
              </p>
              <p className="text-xs text-muted-foreground">
                Receive a summary after each analysis.
              </p>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Analysis alerts
              </p>
              <p className="text-xs text-muted-foreground">
                Notify me when detections exceed high confidence.
              </p>
            </div>
            <Switch checked={analysisAlerts} onCheckedChange={setAnalysisAlerts} />
          </div>
          <p className="pt-1 text-xs text-muted-foreground">
            Notification preferences are illustrative only and are not wired
            up to a backend yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
