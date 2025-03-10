import { type CSSProperties } from "react";

interface TiltSettings {
  maxTilt: number;
  perspective: number;
  easing: string;
  scale: number;
  speed: number;
  transition: boolean;
  disableAxis?: "x" | "y" | null;
  reset: boolean;
  glare: boolean;
  maxGlare: number;
  glarePrerender: boolean;
}

interface TiltTransforms {
  tiltX: number;
  tiltY: number;
  percentageX: number;
  percentageY: number;
  angle: number;
}

class Tilt {
  private element: HTMLElement;
  private settings: TiltSettings;
  private glareElement?: HTMLElement;
  private glareElementWrapper?: HTMLElement;
  private ticking: boolean = false;
  private reset: boolean = false;
  private transforms: TiltTransforms = {
    tiltX: 0,
    tiltY: 0,
    percentageX: 0,
    percentageY: 0,
    angle: 0,
  };

  constructor(element: HTMLElement, settings?: Partial<TiltSettings>) {
    this.element = element;
    this.settings = {
      maxTilt: settings?.maxTilt || 20,
      perspective: settings?.perspective || 300,
      easing: settings?.easing || "cubic-bezier(.03,.98,.52,.99)",
      scale: settings?.scale || 1,
      speed: settings?.speed || 400,
      transition: settings?.transition !== false,
      disableAxis: settings?.disableAxis || null,
      reset: settings?.reset !== false,
      glare: settings?.glare || false,
      maxGlare: settings?.maxGlare || 1,
      glarePrerender: settings?.glarePrerender || false,
    };
    this.init();
  }

  private init() {
    if (this.settings.glare) {
      this.createGlare();
    }
    this.bindEvents();
  }

  private bindEvents() {
    this.element.addEventListener("mousemove", this.handleMouseMove);
    this.element.addEventListener("mouseenter", this.handleMouseEnter);
    if (this.settings.reset) {
      this.element.addEventListener("mouseleave", this.handleMouseLeave);
    }
  }

  private handleMouseMove = (event: MouseEvent): void => {
    const bounds = this.element.getBoundingClientRect();
    const percentageX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const percentageY = ((event.clientY - bounds.top) / bounds.height) * 100;

    const tiltX = ((this.settings.maxTilt / 2) - (percentageX * this.settings.maxTilt) / 100).toFixed(2);
    const tiltY = (((percentageY * this.settings.maxTilt) / 100) - this.settings.maxTilt / 2).toFixed(2);

    this.transforms = {
      tiltX: parseFloat(tiltX),
      tiltY: parseFloat(tiltY),
      percentageX,
      percentageY,
      angle: Math.atan2(event.clientX - bounds.left - bounds.width / 2, -(event.clientY - bounds.top - bounds.height / 2)) * (180 / Math.PI),
    };

    if (!this.ticking) {
      requestAnimationFrame(this.updateTransform);
      this.ticking = true;
    }
  };

  private handleMouseEnter = (): void => {
    this.reset = false;
    this.setTransition(true);
  };

  private handleMouseLeave = (): void => {
    this.reset = true;
    this.setTransition(true);
    if (!this.ticking) {
      requestAnimationFrame(this.updateTransform);
      this.ticking = true;
    }
  };

  private createGlare() {
    const glareWrapper = document.createElement("div");
    const glare = document.createElement("div");

    glareWrapper.className = "js-tilt-glare";
    glare.className = "js-tilt-glare-inner";

    const styles: CSSProperties = {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
    };

    Object.assign(glareWrapper.style, styles);
    this.element.appendChild(glareWrapper);

    this.glareElementWrapper = glareWrapper;
    this.glareElement = glare;
  }

  private setTransition(enable: boolean) {
    this.element.style.transition = enable ? `${this.settings.speed}ms ${this.settings.easing}` : "";
    if (this.glareElement) {
      this.glareElement.style.transition = enable ? `opacity ${this.settings.speed}ms ${this.settings.easing}` : "";
    }
  }

  private updateTransform = (): void => {
    if (this.reset) {
      this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(0deg) rotateY(0deg) scale(${this.settings.scale})`;
      if (this.glareElement) {
        this.glareElement.style.opacity = "0";
      }
      this.ticking = false;
      return;
    }

    this.element.style.transform = `perspective(${this.settings.perspective}px) rotateX(${this.settings.disableAxis === "x" ? 0 : this.transforms.tiltY}deg) rotateY(${this.settings.disableAxis === "y" ? 0 : this.transforms.tiltX}deg) scale(${this.settings.scale})`;

    if (this.glareElement) {
      this.glareElement.style.opacity = `${(this.transforms.percentageY * this.settings.maxGlare) / 100}`;
    }

    this.ticking = false;
  };

  public destroy() {
    this.element.removeEventListener("mousemove", this.handleMouseMove);
    this.element.removeEventListener("mouseenter", this.handleMouseEnter);
    this.element.removeEventListener("mouseleave", this.handleMouseLeave);

    if (this.glareElementWrapper) {
      this.glareElementWrapper.remove();
    }

    this.element.style.transform = "";
  }
}

export default Tilt;
