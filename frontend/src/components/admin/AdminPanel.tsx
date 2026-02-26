import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import AddBlogPostForm from './AddBlogPostForm';
import AddMemoryForm from './AddMemoryForm';
import AddArticleForm from './AddArticleForm';
import AddStudyMaterialForm from './AddStudyMaterialForm';
import EditResumeForm from './EditResumeForm';
import { Settings } from 'lucide-react';

export default function AdminPanel() {
  return (
    <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-full bg-accent/15 flex items-center justify-center">
          <Settings size={16} className="text-accent" />
        </div>
        <h2 className="font-serif text-lg font-semibold text-foreground">Content Management</h2>
        <span className="text-xs bg-accent/15 text-accent px-2 py-0.5 rounded-full font-medium ml-auto">Admin Mode</span>
      </div>
      <Tabs defaultValue="blog">
        <TabsList className="flex-wrap h-auto gap-1 mb-5">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="blog">Blog Post</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="article">Article</TabsTrigger>
          <TabsTrigger value="study">Study Material</TabsTrigger>
        </TabsList>
        <TabsContent value="resume"><EditResumeForm /></TabsContent>
        <TabsContent value="blog"><AddBlogPostForm /></TabsContent>
        <TabsContent value="memory"><AddMemoryForm /></TabsContent>
        <TabsContent value="article"><AddArticleForm /></TabsContent>
        <TabsContent value="study"><AddStudyMaterialForm /></TabsContent>
      </Tabs>
    </div>
  );
}
