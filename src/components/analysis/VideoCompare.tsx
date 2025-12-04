import { useRef, useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoCompareProps {
  proVideoUrl: string;
  userVideoUrl?: string;
  className?: string;
}

const playbackSpeeds = [1, 0.5, 0.25];

export function VideoCompare({ proVideoUrl, userVideoUrl, className }: VideoCompareProps) {
  const proVideoRef = useRef<HTMLVideoElement>(null);
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    const proVideo = proVideoRef.current;
    if (proVideo) {
      proVideo.playbackRate = playbackSpeed;
    }
    const userVideo = userVideoRef.current;
    if (userVideo) {
      userVideo.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handlePlayPause = () => {
    const proVideo = proVideoRef.current;
    const userVideo = userVideoRef.current;
    
    if (isPlaying) {
      proVideo?.pause();
      userVideo?.pause();
    } else {
      proVideo?.play();
      userVideo?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const proVideo = proVideoRef.current;
    if (proVideo && proVideo.duration) {
      setProgress((proVideo.currentTime / proVideo.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const proVideo = proVideoRef.current;
    if (proVideo) {
      setDuration(proVideo.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    const proVideo = proVideoRef.current;
    const userVideo = userVideoRef.current;
    const seekTime = (value[0] / 100) * duration;
    
    if (proVideo) {
      proVideo.currentTime = seekTime;
    }
    if (userVideo) {
      userVideo.currentTime = seekTime;
    }
    setProgress(value[0]);
  };

  const handleReset = () => {
    const proVideo = proVideoRef.current;
    const userVideo = userVideoRef.current;
    
    if (proVideo) {
      proVideo.currentTime = 0;
    }
    if (userVideo) {
      userVideo.currentTime = 0;
    }
    setProgress(0);
    setIsPlaying(false);
    proVideo?.pause();
    userVideo?.pause();
  };

  const cyclePlaybackSpeed = () => {
    const currentIndex = playbackSpeeds.indexOf(playbackSpeed);
    const nextIndex = (currentIndex + 1) % playbackSpeeds.length;
    setPlaybackSpeed(playbackSpeeds[nextIndex]);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pro Video */}
        <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
          <video
            ref={proVideoRef}
            src={proVideoUrl}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-semibold bg-primary/90 text-primary-foreground rounded-md">
              PRO
            </span>
          </div>
        </div>

        {/* User Video */}
        <div className="relative aspect-video bg-muted rounded-xl overflow-hidden">
          {userVideoUrl ? (
            <video
              ref={userVideoRef}
              src={userVideoUrl}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">Upload your video to compare</p>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-semibold bg-secondary text-secondary-foreground rounded-md">
              YOU
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card rounded-xl p-4 space-y-4">
        {/* Progress Scrubber */}
        <Slider
          value={[progress]}
          onValueChange={handleSeek}
          max={100}
          step={0.1}
          className="w-full"
        />

        {/* Playback Controls */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>

          <Button variant="glow" size="lg" onClick={handlePlayPause} className="px-8">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </Button>

          <Button variant="outline" onClick={cyclePlaybackSpeed} className="min-w-16">
            {playbackSpeed}x
          </Button>
        </div>
      </div>
    </div>
  );
}
