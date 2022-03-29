import React from 'react';
import Particles from "react-tsparticles";

export default function Background() {
    return (
        <Particles height={document.documentElement.clientHeight}
            params={
            {
                "background": {
                "color": {
                    "value": "rgb(35, 39, 65)"
                },
                "position": "50% 50%",
                "repeat": "no-repeat",
                "size": "cover"
                },
                "fullScreen": {
                "zIndex": 1
                },
                "interactivity": {
                "events": {
                    "onClick": {
                    "enable": true,
                    "mode": "push"
                    },
                    "onHover": {
                    "enable": true,
                    "mode": "bubble",
                    "parallax": {
                        // "enable": true,
                        "force": 60
                    }
                    }
                },
                "modes": {
                    "bubble": {
                    "distance": 400,
                    "duration": 2,
                    "opacity": 1,
                    "size": 40
                    },
                    "grab": {
                    "distance": 400
                    }
                }
                },
                "particles": {
                "color": {
                    "value": "#ffffff"
                },
                "links": {
                    "color": {
                    "value": "#fff"
                    },
                    "distance": 150,
                    "enable": true,
                    "opacity": 0.4
                },
                "move": {
                    "attract": {
                    "rotate": {
                        "x": 600,
                        "y": 1200
                    }
                    },
                    "enable": true,
                    "outModes": {
                    "bottom": "bounce",
                    "left": "bounce",
                    "right": "bounce",
                    "top": "bounce"
                    },
                    "speed": 3
                },
                "number": {
                    "density": {
                        "enable": true
                    },
                    "value": 120
                },
                "opacity": {
                    "random": {
                    "enable": true
                    },
                    // "value": {
                    // "min": 0.1,
                    // "max": 0.5
                    // },
                    "animation": {
                    // "enable": true,
                    "speed": 1,
                    "minimumValue": 0.1
                    }
                },
              "shape": {
                "options": {
                  "character": {
                    "fill": false,
                    "font": "Verdana",
                    "style": "",
                    "value": "*",
                    "weight": "400"
                  },
                  "char": {
                    "fill": false,
                    "font": "Verdana",
                    "style": "",
                    "value": "*",
                    "weight": "400"
                  },
                  "polygon": {
                    "nb_sides": 5
                  },
                  "star": {
                    "nb_sides": 5
                  },
                  "image": {
                    "height": 32,
                    "replace_color": true,
                    "src": "/logo192.png",
                    "width": 32
                  },
                  "images": {
                    "height": 32,
                    "replace_color": true,
                    "src": "/logo192.png",
                    "width": 32
                  }
                },
                "type": "image"
              },
                "size": {
                    "value": 16,
                    "animation": {
                        "speed": 40,
                        "minimumValue": 0.1
                    }
                    // "color": {
                    //     "value": "#000000",
                    //     "animation": {
                    //       "h": {
                    //         "count": 0,
                    //         "enable": false,
                    //         "offset": 0,
                    //         "speed": 1,
                    //         "sync": true
                    //       },
                    //       "s": {
                    //         "count": 0,
                    //         "enable": false,
                    //         "offset": 0,
                    //         "speed": 1,
                    //         "sync": true
                    //       },
                    //       "l": {
                    //         "count": 0,
                    //         "enable": false,
                    //         "offset": 0,
                    //         "speed": 1,
                    //         "sync": true
                    //       }
                    //     }
                    },
                    "stroke": {
                        "color": {
                          "value": "#000000",
                          "animation": {
                            "h": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "sync": true
                            },
                            "s": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "sync": true
                            },
                            "l": {
                              "count": 0,
                              "enable": false,
                              "offset": 0,
                              "speed": 1,
                              "sync": true
                            }
                          }
                        }
                      }
                    // "random": {
                    // "enable": true
                    // },
                    // "animation": {
                    // "enable": true,
                    // "speed": 20,
                    // "minimumValue": 0.1
                    // }
                
                    }
                }
            }
        />
    )
}