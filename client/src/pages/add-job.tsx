import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  FileText,
  AlertTriangle,
  Send,
  Link2,
} from "lucide-react";
import type { Resume } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AddJobPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");

  const { data: resume } = useQuery<Resume | null>({
    queryKey: ["/api/resume"],
  });

  const submitMutation = useMutation({
    mutationFn: async ({ description, url }: { description: string; url: string }) => {
      const res = await apiRequest("POST", "/api/jobs/evaluate", {
        rawDescription: description,
        jobUrl: url || null,
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setJobDescription("");
      setJobUrl("");
      toast({
        title: "Job evaluated",
        description: `${data.title} at ${data.company} - ${data.fitLevel} fit`,
      });
      setLocation(`/job/${data.id}`);
    },
    onError: (err: Error) => {
      toast({ title: "Evaluation failed", description: err.message, variant: "destructive" });
    },
  });

  const hasResume = resume !== null && resume !== undefined;

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold" data-testid="text-add-job-title">Add Job</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Paste a job description below. I'll evaluate it against your resume and tell you exactly where you stand.
        </p>
      </div>

      {!hasResume && (
        <Card className="p-4 border-destructive/30 bg-destructive/5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Resume required</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Upload your resume first so I can evaluate jobs against your background. Without it, I'm just guessing.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2"
                onClick={() => setLocation("/resume")}
                data-testid="button-go-to-resume"
              >
                <FileText className="w-4 h-4 mr-1" />
                Upload Resume
              </Button>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Job Post Link</h3>
            <p className="text-xs text-muted-foreground mb-2">
              Paste the URL of the original job posting so you can refer back to it later.
            </p>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://linkedin.com/jobs/... or company careers page link"
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="pl-9 text-sm"
                data-testid="input-job-url"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-1">Job Description</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Copy and paste the full job description. Include title, company, requirements, responsibilities - everything you can find.
            </p>
            <Textarea
              placeholder={"Paste the full job description here...\n\nExample:\nSoftware Engineer at Google\nLocation: Mountain View, CA\nRequirements:\n- 3+ years of experience in...\n- Proficiency in..."}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[280px] text-sm"
              data-testid="input-job-description"
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="text-xs text-muted-foreground">
              {jobDescription.trim().length > 0
                ? `${jobDescription.trim().split(/\s+/).length} words`
                : "Waiting for input..."}
            </p>
            <Button
              onClick={() => submitMutation.mutate({ description: jobDescription, url: jobUrl })}
              disabled={!jobDescription.trim() || !hasResume || submitMutation.isPending}
              data-testid="button-evaluate-job"
            >
              {submitMutation.isPending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Send className="w-4 h-4 mr-1" />
              )}
              {submitMutation.isPending ? "Evaluating..." : "Evaluate Job"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
