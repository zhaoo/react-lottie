import lottieApi from 'lottie-api';
import lottie, {AnimationItem, AnimationDirection, AnimationSegment, LottiePlayer} from 'lottie-web';
import {IAnimationInstance, AnimationSoltText, AnimationSoltImage} from '../@types/web';

export class AnimationInstance implements IAnimationInstance {
  anim: AnimationItem | null = null;
  api = lottieApi;
  lottie: LottiePlayer = lottie;

  /** 官方方法 */

  play = (): void => {
    this.anim?.play();
  };

  pause = (): void => {
    this.anim?.pause();
  };

  stop = (): void => {
    this.anim?.stop();
  };

  destroy = (): void => {
    this.anim?.destroy();
  };

  setSpeed = (speed: number): void => {
    this.anim?.setSpeed(speed);
  };

  setDirection = (direction: AnimationDirection): void => {
    this.anim?.setDirection(direction);
  };

  setSubframe = (useSubFrames: boolean): void => {
    this.anim?.setSubframe(useSubFrames);
  };

  playSegments = (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean): void => {
    this.anim?.playSegments(segments, forceFlag);
  };

  getDuration = (inFrames?: boolean): number | undefined => {
    return this.anim?.getDuration(inFrames);
  };

  goToAndPlay = (value: number, isFrame?: boolean): void => {
    this.anim?.goToAndPlay(value, isFrame);
  };

  goToAndStop = (value: number, isFrame?: boolean): void => {
    this.anim?.goToAndStop(value, isFrame);
  };

  /** 扩展方法 */

  goToProgressAndPlay = (value: number): void => {
    this.anim?.goToAndPlay(value * this.anim?.totalFrames || 0, true);
  };

  goToProgressAndStop = (value: number): void => {
    this.anim?.goToAndStop(value * this.anim?.totalFrames || 0, true);
  };

  slotText = ({text, id, className, comp, layer}: AnimationSoltText): void => {
    if (!text) return;
    if (id) {
      const element = document.getElementById(id)?.querySelector('tspan');
      if (element) element.innerHTML = text;
    } else if (className) {
      const element = document.getElementsByClassName(className)[0].querySelector('tspan');
      if (element) element.innerHTML = text;
    } else if (comp && layer) {
      const api = lottieApi.createAnimationApi(this.anim);
      const elements = api.getKeyPath(`${comp},${layer}`);
      elements.getElements()[0].setText(text);
    }
  };

  slotImage = ({src, id, className}: AnimationSoltImage): void => {
    if (!src) return;
    if (id) {
      const element = document.getElementById(id)?.querySelector('image');
      if (element) element.setAttribute('href', src);
    } else if (className) {
      const element = document.getElementsByClassName(className)[0].querySelector('image');
      if (element) element.setAttribute('href', src);
    }
  };
}

export default new AnimationInstance();
