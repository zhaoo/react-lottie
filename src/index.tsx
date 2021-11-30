import {useRef, useEffect, forwardRef, useImperativeHandle, ForwardedRef, useState} from 'react';
import lottie, {AnimationItem} from 'lottie-web';
import instance, {AnimationInstance} from './misc/instance';
import {IAnimationProps, AnimationListener, IInitInstance} from './@types/web';
import './index.css';

/** 实例化 */
const initInstance: IInitInstance = anim => (instance.anim = anim);

const Lottie = forwardRef((props: IAnimationProps, ref: ForwardedRef<AnimationInstance>) => {
  const {
    onComplete,
    onLoopComplete,
    onEnterFrame,
    onSegmentStart,
    onConfigReady,
    onDataReady,
    onDataFailed,
    onLoadedImages,
    onDOMLoaded,
    onDestroy,
    onError,
    style,
    placeholder,
    needDowngrade = true,
    ...options
  } = props;

  const name = options.name || `lottie-${new Date().getTime()}`;
  const containerRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef(options);
  const [anim, setAnim] = useState<AnimationItem | null>(null);
  const [showImage, setShowImage] = useState<boolean>(needDowngrade && Boolean(placeholder));

  /** 初始化 */
  useEffect(() => {
    if (!containerRef.current || optionsRef.current === options) return;
    optionsRef.current = options;
    const animationConfig = {
      ...options,
      container: containerRef.current,
      name,
    };
    const newAnim = lottie.loadAnimation(animationConfig); // 渲染动画
    showImage && newAnim.addEventListener('DOMLoaded', () => setShowImage(false)); // 销毁兜底图
    initInstance(newAnim); // 生成实例
    setAnim(newAnim);

    return () => anim?.destroy();
  }, [options, anim, name, showImage]);

  /** 绑定实例 */
  useImperativeHandle(ref, () => instance, []);

  /** 绑定事件 */
  useEffect(() => {
    const partialListeners: AnimationListener[] = [
      {name: 'complete', handler: onComplete},
      {name: 'loopComplete', handler: onLoopComplete},
      {name: 'enterFrame', handler: onEnterFrame},
      {name: 'segmentStart', handler: onSegmentStart},
      {name: 'config_ready', handler: onConfigReady},
      {name: 'data_ready', handler: onDataReady},
      {name: 'data_failed', handler: onDataFailed},
      {name: 'loaded_images', handler: onLoadedImages},
      {name: 'DOMLoaded', handler: onDOMLoaded},
      {name: 'destroy', handler: onDestroy},
      {name: 'error', handler: onError},
    ];
    const listeners = partialListeners.filter(listener => listener.handler != null);

    const deregisterList = listeners.map(listener => {
      anim?.addEventListener(listener.name, listener.handler);
      return () => anim?.removeEventListener(listener.name, listener.handler);
    });

    return () => deregisterList.forEach(deregister => deregister());
  }, [
    anim,
    onComplete,
    onLoopComplete,
    onEnterFrame,
    onSegmentStart,
    onConfigReady,
    onDataReady,
    onDataFailed,
    onLoadedImages,
    onDOMLoaded,
    onDestroy,
    onError,
  ]);

  return (
    <div className="rxpi-lottie" style={style}>
      <img x-if={showImage} className="rxpi-lottie-image" style={style} src={placeholder} alt={name} />
      <div ref={containerRef} style={style} />
    </div>
  );
});

export default Lottie;
