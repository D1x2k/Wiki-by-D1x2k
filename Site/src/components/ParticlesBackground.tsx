import { useCallback } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export const ParticlesBackground = () => {
    const init = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <ParticlesProvider init={init}>
            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "transparent",
                        },
                    },
                    fullScreen: {
                        enable: true,
                        zIndex: -1,
                    },
                    fpsLimit: 120, // Support high refresh rate monitors
                    interactivity: {
                        events: {
                            onHover: {
                                enable: true,
                                mode: "bubble", // Bubble is much smoother than repulse
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 250,
                                duration: 2,
                                size: 4,
                                opacity: 0.8,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#a78bfa",
                        },
                        links: {
                            enable: false,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "out",
                            },
                            random: true,
                            speed: 0.4, // Slightly faster to avoid sub-pixel stutter
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                            },
                            value: 60, // Slightly fewer so it doesn't look messy
                        },
                        opacity: {
                            value: { min: 0.1, max: 0.4 },
                            animation: {
                                enable: true,
                                speed: 0.5,
                                sync: false,
                                startValue: "min",
                                destroy: "none"
                            }
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 2 },
                            animation: {
                                enable: true,
                                speed: 1,
                                sync: false,
                                startValue: "min",
                                destroy: "none"
                            }
                        },
                    },
                    detectRetina: true,
                }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1,
                    pointerEvents: "none",
                }}
            />
        </ParticlesProvider>
    );
};
