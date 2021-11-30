import {AnimationEventHandler, CSSProperties} from 'react';
import {
  AnimationConfig,
  AnimationEventName,
  AnimationItem,
  AnimationDirection,
  AnimationSegment,
  LottiePlayer,
} from 'lottie-web';

interface Window {
  __isSSR: boolean;
}

export type AnimationListener = {
  name: AnimationEventName;
  handler: AnimationEventHandler;
};

export type AnimationSoltText = {
  text: string;
  id?: string;
  className?: string;
  comp?: string;
  layer?: string;
};

export type AnimationSoltImage = {
  src: string;
  id?: string;
  className?: string;
};

export interface IAnimationProps extends Omit<AnimationConfig, 'container'> {
  name?: string;
  path?: string;
  animationData?: any;
  placeholder?: string;
  needDowngrade?: boolean;
  style?: CSSProperties;
  onComplete: AnimationEventHandler;
  onLoopComplete: AnimationEventHandler;
  onEnterFrame: AnimationEventHandler;
  onSegmentStart: AnimationEventHandler;
  onConfigReady: AnimationEventHandler;
  onDataReady: AnimationEventHandler;
  onDataFailed: AnimationEventHandler;
  onLoadedImages: AnimationEventHandler;
  onDOMLoaded: AnimationEventHandler;
  onDestroy: AnimationEventHandler;
  onError: AnimationEventHandler;
}

export interface IAnimationInstance {
  anim: AnimationItem | null;
  lottie: LottiePlayer;
  api: any;
  play: () => void;
  pause: () => void;
  stop: () => void;
  destroy: () => void;
  setSpeed: (speed: number) => void;
  setDirection: (direction: AnimationDirection) => void;
  setSubframe: (useSubFrames: boolean) => void;
  playSegments: (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean) => void;
  getDuration: (inFrames?: boolean) => number | undefined;
  goToAndPlay: (value: number, isFrame?: boolean) => void;
  goToAndStop: (value: number, isFrame?: boolean) => void;
  goToProgressAndPlay: (value: number) => void;
  goToProgressAndStop: (value: number) => void;
  slotText: (props: AnimationSoltText) => void;
  slotImage: (props: AnimationSoltImage) => void;
}

export interface IInitInstance {
  (anim: AnimationItem): void;
}