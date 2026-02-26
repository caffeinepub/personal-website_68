import { useState, useMemo } from 'react';
import type { StudyMaterial } from '../backend';

export function useStudyMaterialFilter(materials: StudyMaterial[]) {
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const subjects = useMemo(() => {
    const set = new Set(materials.map((m) => m.subject));
    return ['All', ...Array.from(set).sort()];
  }, [materials]);

  const filtered = useMemo(() => {
    if (selectedSubject === 'All') return materials;
    return materials.filter((m) => m.subject === selectedSubject);
  }, [materials, selectedSubject]);

  return { filtered, subjects, selectedSubject, setSelectedSubject };
}
