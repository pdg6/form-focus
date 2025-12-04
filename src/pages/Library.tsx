import { useState, useMemo } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { BottomNav } from '@/components/layout/BottomNav';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';
import { ExerciseFilters } from '@/components/exercises/ExerciseFilters';
import { Input } from '@/components/ui/input';
import { exercises, muscleGroups, movementPatterns } from '@/data/exercises';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Library = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle = !selectedMuscle || exercise.muscleGroup === selectedMuscle;
      const matchesPattern = !selectedPattern || exercise.movementPattern === selectedPattern;
      return matchesSearch && matchesMuscle && matchesPattern;
    });
  }, [searchQuery, selectedMuscle, selectedPattern]);

  return (
    <PageContainer>
      <div className="px-4 pt-8 pb-4 space-y-6 animate-fade-in">
        {/* Header */}
        <header>
          <h1 className="text-2xl font-bold text-foreground">Exercise Library</h1>
          <p className="text-muted-foreground">Select an exercise to analyze</p>
        </header>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search exercises..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-secondary border-border"
          />
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <ExerciseFilters
            label="Muscle Group"
            options={muscleGroups}
            selected={selectedMuscle}
            onSelect={setSelectedMuscle}
          />
          <ExerciseFilters
            label="Movement Pattern"
            options={movementPatterns}
            selected={selectedPattern}
            onSelect={setSelectedPattern}
          />
        </div>

        {/* Exercise List */}
        <div className="space-y-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => navigate(`/analyze/${exercise.id}`)}
            />
          ))}
          {filteredExercises.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No exercises found
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </PageContainer>
  );
};

export default Library;
