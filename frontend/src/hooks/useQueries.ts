import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Resume, BlogPost, Memory, Article, StudyMaterial } from '../backend';

// ─── Resume ───────────────────────────────────────────────────────────────────

export function useGetResume() {
  const { actor, isFetching } = useActor();
  return useQuery<Resume | null>({
    queryKey: ['resume'],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getResume();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateResume() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resume: Resume) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.updateResume(resume);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume'] });
    },
  });
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export function useGetAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ['blogPosts'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetBlogPost(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost>({
    queryKey: ['blogPost', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.getBlogPost(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateBlogPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, content, tags }: { title: string; content: string; tags: string[] }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.createBlogPost(title, content, tags);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    },
  });
}

// ─── Memories ─────────────────────────────────────────────────────────────────

export function useGetAllMemories() {
  const { actor, isFetching } = useActor();
  return useQuery<Memory[]>({
    queryKey: ['memories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMemories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddMemory() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.addMemory(title, description, imageUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memories'] });
    },
  });
}

// ─── Articles ─────────────────────────────────────────────────────────────────

export function useGetAllArticles() {
  const { actor, isFetching } = useActor();
  return useQuery<Article[]>({
    queryKey: ['articles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllArticles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetArticle(id: bigint) {
  const { actor, isFetching } = useActor();
  return useQuery<Article>({
    queryKey: ['article', id.toString()],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not ready');
      return actor.getArticle(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateArticle() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, content, coverImageUrl }: { title: string; content: string; coverImageUrl?: string }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.createArticle(title, content, coverImageUrl ?? null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });
}

// ─── Study Materials ──────────────────────────────────────────────────────────

export function useGetAllStudyMaterials() {
  const { actor, isFetching } = useActor();
  return useQuery<StudyMaterial[]>({
    queryKey: ['studyMaterials'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStudyMaterials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddStudyMaterial() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, subject, description, content }: { title: string; subject: string; description: string; content: string }) => {
      if (!actor) throw new Error('Actor not ready');
      return actor.addStudyMaterial(title, subject, description, content);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyMaterials'] });
    },
  });
}
