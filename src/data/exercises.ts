export interface Cue {
  id: string;
  text: string;
  category: 'mobility' | 'stability' | 'safety';
  weight?: number;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  movementPattern: string;
  proVideoUrl: string;
  thumbnailUrl: string;
  cues: Cue[];
  phases: {
    eccentric: { start: number; end: number };
    concentric: { start: number; end: number };
  };
}

export interface UserLog {
  id: string;
  exerciseId: string;
  timestamp: string;
  score: number;
  completedCues: string[];
  missedCues: string[];
}

export const exercises: Exercise[] = [
  {
    id: 'squat_bb',
    name: 'Barbell Back Squat',
    muscleGroup: 'Legs',
    equipment: 'Barbell',
    movementPattern: 'Squat',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Hips break parallel', category: 'mobility', weight: 1 },
      { id: 'c2', text: 'Knees track over toes', category: 'stability', weight: 1 },
      { id: 'c3', text: 'Neutral spine maintained', category: 'safety', weight: 2 },
      { id: 'c4', text: 'Heels remain planted', category: 'stability', weight: 1 },
      { id: 'c5', text: 'Core braced throughout', category: 'safety', weight: 2 },
    ],
    phases: {
      eccentric: { start: 0, end: 2 },
      concentric: { start: 2, end: 4 },
    },
  },
  {
    id: 'deadlift_conv',
    name: 'Conventional Deadlift',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    movementPattern: 'Hinge',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Bar path stays vertical', category: 'stability', weight: 1 },
      { id: 'c2', text: 'Shoulders over bar at start', category: 'stability', weight: 1 },
      { id: 'c3', text: 'Neutral spine maintained', category: 'safety', weight: 2 },
      { id: 'c4', text: 'Hips and shoulders rise together', category: 'stability', weight: 1 },
    ],
    phases: {
      eccentric: { start: 0, end: 2 },
      concentric: { start: 2, end: 4 },
    },
  },
  {
    id: 'bench_press',
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    equipment: 'Barbell',
    movementPattern: 'Push',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Shoulder blades retracted', category: 'stability', weight: 1 },
      { id: 'c2', text: 'Bar touches mid-chest', category: 'mobility', weight: 1 },
      { id: 'c3', text: 'Feet planted firmly', category: 'stability', weight: 1 },
      { id: 'c4', text: 'Elbows at 45° angle', category: 'safety', weight: 2 },
    ],
    phases: {
      eccentric: { start: 0, end: 1.5 },
      concentric: { start: 1.5, end: 3 },
    },
  },
  {
    id: 'row_bb',
    name: 'Barbell Row',
    muscleGroup: 'Back',
    equipment: 'Barbell',
    movementPattern: 'Pull',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Torso at 45° angle', category: 'stability', weight: 1 },
      { id: 'c2', text: 'Bar pulls to lower chest', category: 'mobility', weight: 1 },
      { id: 'c3', text: 'No momentum used', category: 'stability', weight: 1 },
      { id: 'c4', text: 'Neutral spine maintained', category: 'safety', weight: 2 },
    ],
    phases: {
      eccentric: { start: 0, end: 1 },
      concentric: { start: 1, end: 2 },
    },
  },
  {
    id: 'ohp',
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    equipment: 'Barbell',
    movementPattern: 'Push',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Bar clears face efficiently', category: 'stability', weight: 1 },
      { id: 'c2', text: 'Core tight, no lean back', category: 'safety', weight: 2 },
      { id: 'c3', text: 'Full lockout at top', category: 'mobility', weight: 1 },
    ],
    phases: {
      eccentric: { start: 0, end: 1 },
      concentric: { start: 1, end: 2 },
    },
  },
  {
    id: 'rdl',
    name: 'Romanian Deadlift',
    muscleGroup: 'Legs',
    equipment: 'Barbell',
    movementPattern: 'Hinge',
    proVideoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: '',
    cues: [
      { id: 'c1', text: 'Slight knee bend maintained', category: 'stability', weight: 1 },
      { id: 'c2', text: 'Hinge from hips', category: 'mobility', weight: 1 },
      { id: 'c3', text: 'Bar stays close to legs', category: 'stability', weight: 1 },
      { id: 'c4', text: 'Hamstring stretch felt', category: 'mobility', weight: 1 },
      { id: 'c5', text: 'Neutral spine maintained', category: 'safety', weight: 2 },
    ],
    phases: {
      eccentric: { start: 0, end: 2 },
      concentric: { start: 2, end: 4 },
    },
  },
];

export const muscleGroups = ['Legs', 'Back', 'Chest', 'Shoulders'];
export const equipmentTypes = ['Barbell', 'Dumbbell', 'Bodyweight', 'Cable'];
export const movementPatterns = ['Squat', 'Hinge', 'Push', 'Pull'];

// Mock user history
export const userHistory: UserLog[] = [
  {
    id: 'log_1',
    exerciseId: 'squat_bb',
    timestamp: '2024-12-01T10:00:00Z',
    score: 80,
    completedCues: ['c1', 'c2', 'c4', 'c5'],
    missedCues: ['c3'],
  },
  {
    id: 'log_2',
    exerciseId: 'squat_bb',
    timestamp: '2024-11-28T10:00:00Z',
    score: 60,
    completedCues: ['c1', 'c4', 'c5'],
    missedCues: ['c2', 'c3'],
  },
  {
    id: 'log_3',
    exerciseId: 'deadlift_conv',
    timestamp: '2024-11-30T10:00:00Z',
    score: 75,
    completedCues: ['c1', 'c2', 'c4'],
    missedCues: ['c3'],
  },
  {
    id: 'log_4',
    exerciseId: 'bench_press',
    timestamp: '2024-11-29T10:00:00Z',
    score: 100,
    completedCues: ['c1', 'c2', 'c3', 'c4'],
    missedCues: [],
  },
  {
    id: 'log_5',
    exerciseId: 'squat_bb',
    timestamp: '2024-11-25T10:00:00Z',
    score: 40,
    completedCues: ['c1', 'c2'],
    missedCues: ['c3', 'c4', 'c5'],
  },
];
