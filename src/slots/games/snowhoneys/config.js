import * as PIXI from 'pixi.js';

const cellProps = {
    width: 120,
    height: 120,
    offsetX: 8,
    offsetY: 0,
    startOffsetX: 0,
    startOffsetY: 0
};
const winLinesMap = {
    1: [1, 1, 1, 1, 1],
    2: [0, 0, 0, 0, 0],
    3: [2, 2, 2, 2, 2],
    4: [0, 1, 2, 1, 0],
    5: [2, 1, 0, 1, 2],
    6: [0, 0, 1, 2, 2],
    7: [2, 2, 1, 0, 0],
    8: [1, 0, 0, 0, 1],
    9: [1, 2, 2, 2, 1],
    10: [1, 2, 1, 0, 1],
    11: [1, 0, 1, 2, 1],
    12: [0, 1, 1, 1, 0],
    13: [2, 1, 1, 1, 2],
    14: [0, 1, 0, 1, 0],
    15: [2, 1, 2, 1, 2],
    16: [1, 1, 0, 1, 1],
    17: [1, 1, 2, 1, 1],
    18: [0, 0, 2, 0, 0],
    19: [2, 2, 0, 2, 2],
    20: [0, 2, 2, 2, 0],
    21: [2, 0, 0, 0, 2],
    22: [1, 2, 0, 2, 1],
    23: [1, 0, 2, 0, 1],
    24: [0, 2, 0, 2, 0],
    25: [2, 0, 2, 0, 2],
    26: [2, 0, 1, 2, 0],
    27: [0, 2, 1, 0, 2],
    28: [0, 2, 1, 2, 0],
    29: [2, 0, 1, 0, 2],
    30: [2, 1, 0, 0, 1],
    31: [0, 1, 2, 2, 1],
    32: [1, 0, 1, 0, 1],
    33: [1, 2, 1, 2, 1],
    34: [0, 0, 2, 2, 2],
    35: [2, 2, 0, 0, 0],
    36: [1, 0, 2, 1, 2],
    37: [1, 2, 0, 1, 0],
    38: [0, 1, 0, 1, 2],
    39: [2, 1, 2, 1, 0],
    40: [1, 2, 2, 0, 0],
    41: [1, 0, 0, 2, 2],
    42: [0, 0, 1, 1, 2],
    43: [2, 2, 1, 1, 0],
    44: [0, 1, 1, 2, 2],
    45: [2, 1, 1, 0, 0],
    46: [1, 2, 1, 0, 0],
    47: [1, 0, 1, 2, 2],
    48: [2, 2, 1, 2, 2],
    49: [0, 0, 1, 0, 0],
    50: [2, 1, 2, 0, 1],
    51: [0, 1, 0, 2, 1],
    52: [2, 2, 2, 2, 1],
    53: [1, 1, 1, 1, 2],
    54: [2, 0, 0, 0, 0],
    55: [0, 2, 2, 2, 2],
    56: [1, 1, 1, 1, 0],
    57: [0, 0, 0, 0, 1],
    58: [2, 2, 2, 2, 0],
    59: [0, 1, 1, 1, 2],
    60: [2, 1, 1, 1, 0],
    61: [0, 1, 1, 2, 1],
    62: [2, 1, 1, 0, 1],
    63: [1, 0, 0, 1, 0],
    64: [1, 2, 2, 1, 2],
    65: [1, 1, 0, 2, 1],
    66: [1, 1, 2, 0, 1],
    67: [1, 0, 0, 1, 2],
    68: [1, 2, 2, 1, 0],
    69: [0, 1, 1, 0, 0],
    70: [2, 1, 1, 2, 2],
    71: [0, 1, 0, 0, 1],
    72: [2, 1, 2, 2, 1],
    73: [0, 0, 2, 1, 2],
    74: [2, 2, 0, 1, 0],
    75: [0, 2, 2, 0, 2],
    76: [2, 0, 0, 2, 0],
    77: [1, 0, 2, 2, 2],
    78: [1, 2, 0, 0, 0],
    79: [0, 2, 0, 1, 2],
    80: [2, 0, 2, 1, 0],
    81: [0, 0, 2, 0, 1],
    82: [2, 2, 0, 2, 1],
    83: [0, 1, 2, 0, 0],
    84: [2, 1, 0, 2, 2],
    85: [0, 0, 2, 0, 2],
    86: [2, 2, 0, 2, 0],
    87: [0, 2, 0, 0, 1],
    88: [2, 0, 2, 2, 1],
    89: [0, 2, 2, 1, 1],
    90: [2, 0, 0, 1, 1],
    91: [0, 2, 0, 1, 1],
    92: [2, 0, 2, 1, 1],
    93: [1, 0, 1, 0, 0],
    94: [1, 2, 1, 2, 2],
    95: [1, 0, 2, 1, 1],
    96: [1, 2, 0, 1, 1],
    97: [0, 1, 1, 0, 2],
    98: [2, 1, 1, 2, 0],
    99: [0, 1, 2, 1, 1],
    100: [2, 1, 0, 1, 1],
    101: [0, 2, 1, 2, 2],
    102: [2, 0, 1, 0, 0],
    103: [1, 0, 2, 0, 0],
    104: [1, 2, 0, 2, 2],
    105: [1, 1, 0, 0, 2],
    106: [1, 1, 2, 2, 0],
    107: [1, 0, 1, 2, 0],
    108: [1, 2, 1, 0, 2],
    109: [1, 1, 1, 0, 1],
    110: [1, 1, 1, 2, 1],
    111: [1, 0, 2, 2, 1],
    112: [1, 2, 0, 0, 1],
    113: [0, 0, 2, 1, 0],
    114: [2, 2, 0, 1, 2],
    115: [0, 2, 2, 0, 1],
    116: [2, 0, 0, 2, 1],
    117: [0, 0, 0, 2, 2],
    118: [2, 2, 2, 0, 0],
    119: [0, 2, 2, 0, 0],
    120: [2, 0, 0, 2, 2],
    121: [0, 1, 2, 2, 2],
    122: [2, 1, 0, 0, 0],
    123: [0, 0, 2, 1, 1],
    124: [2, 2, 0, 1, 1],
    125: [0, 1, 2, 2, 0],
    126: [2, 1, 0, 0, 2],
    127: [1, 0, 1, 1, 1],
    128: [1, 2, 1, 1, 1],
    129: [0, 0, 0, 1, 1],
    130: [2, 2, 2, 1, 1],
    131: [0, 1, 1, 2, 0],
    132: [2, 1, 1, 0, 2],
    133: [0, 2, 1, 2, 1],
    134: [2, 0, 1, 0, 1],
    135: [1, 1, 0, 0, 0],
    136: [1, 1, 2, 2, 2],
    137: [0, 0, 0, 2, 1],
    138: [2, 2, 2, 0, 1],
    139: [0, 2, 1, 0, 1],
    140: [2, 0, 1, 2, 1],
    141: [1, 0, 1, 0, 2],
    142: [1, 2, 1, 2, 0],
    143: [0, 1, 0, 2, 0],
    144: [2, 1, 2, 0, 2],
    145: [1, 1, 0, 2, 0],
    146: [1, 1, 2, 0, 2],
    147: [0, 0, 1, 2, 0],
    148: [2, 2, 1, 0, 2],
    149: [0, 2, 0, 1, 0],
    150: [2, 0, 2, 1, 2],
    151: [0, 0, 0, 0, 2],
    152: [0, 2, 2, 1, 2],
    153: [2, 0, 0, 1, 0],
    154: [0, 2, 1, 0, 0],
    155: [2, 0, 1, 2, 2],
    156: [1, 0, 0, 1, 1],
    157: [1, 2, 2, 1, 1],
    158: [0, 1, 0, 1, 1],
    159: [2, 1, 2, 1, 1],
    160: [0, 0, 0, 2, 0],
    161: [2, 2, 2, 0, 2],
    162: [0, 0, 1, 0, 2],
    163: [2, 2, 1, 2, 0],
    164: [0, 1, 1, 0, 1],
    165: [2, 1, 1, 2, 1],
    166: [0, 0, 0, 1, 0],
    167: [2, 2, 2, 1, 2],
    168: [0, 0, 1, 1, 1],
    169: [2, 2, 1, 1, 1],
    170: [0, 0, 2, 2, 1],
    171: [2, 2, 0, 0, 1],
    172: [1, 1, 0, 2, 2],
    173: [1, 1, 2, 0, 0],
    174: [1, 0, 0, 0, 2],
    175: [1, 2, 2, 2, 0],
    176: [0, 1, 0, 2, 2],
    177: [2, 1, 2, 0, 0],
    178: [0, 0, 2, 2, 0],
    179: [2, 2, 0, 0, 2],
    180: [1, 0, 0, 2, 1],
    181: [1, 2, 2, 0, 1],
    182: [0, 2, 1, 1, 0],
    183: [2, 0, 1, 1, 2],
    184: [0, 1, 2, 0, 1],
    185: [2, 1, 0, 2, 1],
    186: [0, 1, 0, 0, 0],
    187: [2, 1, 2, 2, 2],
    188: [0, 2, 0, 0, 2],
    189: [2, 0, 2, 2, 0],
    190: [0, 2, 1, 1, 2],
    191: [2, 0, 1, 1, 0],
    192: [0, 2, 2, 2, 1],
    193: [2, 0, 0, 0, 1],
    194: [0, 1, 2, 0, 2],
    195: [2, 1, 0, 2, 0],
    196: [1, 0, 2, 2, 0],
    197: [1, 2, 0, 0, 2],
    198: [0, 0, 1, 0, 1],
    199: [2, 2, 1, 2, 1],
    200: [1, 1, 0, 0, 1],
    201: [1, 1, 2, 2, 1],
    202: [0, 2, 0, 2, 1],
    203: [2, 0, 2, 0, 1],
    204: [1, 1, 1, 0, 2],
    205: [1, 1, 1, 2, 0],
    206: [1, 1, 0, 1, 0],
    207: [1, 1, 2, 1, 2],
    208: [0, 0, 1, 1, 0],
    209: [2, 2, 1, 1, 2],
    210: [1, 1, 1, 0, 0],
    211: [1, 1, 1, 2, 2],
    212: [0, 0, 1, 2, 1],
    213: [2, 2, 1, 0, 1],
    214: [1, 1, 0, 1, 2],
    215: [1, 1, 2, 1, 0],
    216: [1, 0, 2, 1, 0],
    217: [1, 2, 0, 1, 2],
    218: [0, 2, 2, 1, 0],
    219: [2, 0, 0, 1, 2],
    220: [0, 1, 1, 1, 1],
    221: [2, 1, 1, 1, 1],
    222: [0, 2, 1, 1, 1],
    223: [2, 0, 1, 1, 1],
    224: [0, 2, 0, 0, 0],
    225: [2, 0, 2, 2, 2],
    226: [0, 1, 0, 0, 2],
    227: [2, 1, 2, 2, 0],
    228: [1, 0, 0, 2, 0],
    229: [1, 2, 2, 0, 2],
    230: [1, 0, 0, 0, 0],
    231: [1, 2, 2, 2, 2],
    232: [1, 0, 1, 1, 0],
    233: [1, 2, 1, 1, 2],
    234: [0, 0, 0, 1, 2],
    235: [2, 2, 2, 1, 0],
    236: [1, 0, 2, 0, 2],
    237: [1, 2, 0, 2, 0],
    238: [0, 1, 2, 1, 2],
    239: [2, 1, 0, 1, 0],
    240: [1, 0, 1, 1, 2],
    241: [1, 2, 1, 1, 0],
    242: [0, 2, 0, 2, 2],
    243: [2, 0, 2, 0, 0]
};

const offsetLineForXPosition = [0, 0, 0];

const settings = {
    cell: {
        width: 120,
        height: 120,
        offsetX: 8,
        offsetY: 0,
        startOffsetX: 0,
        startOffsetY: 0
    },
    reel: {
        totalCount: 5,
        container: {
            x: 64,
            y: -30
        },
        position: {
            x: 64,
            y: 0
        },
        cellDimensions: {
            width: 120,
            height: 120,
            offsetX: 8,
            offsetY: 0,
            startOffsetX: 0,
            startOffsetY: 0
        },
        colors: {
            common: '0xffffff',
            freegame: '0x000000'
        },
        offsetX: 8
    },

    symbols: {
        freegameSymbol: 2,
        freespinsSymbol: 12
    },

    symbolAnimation: {
        container: {
            x: 64,
            y: 90
        },
        framesCount: {
            sym_1: 60,
            sym_2: 45,
            sym_3: 23,
            sym_4: 23,
            sym_5: 23,
            sym_6: 23,
            sym_7: 23,
            sym_8: 23,
            sym_9: 23,
            sym_10: 45,
            sym_11: 23,
            sym_12: 23
        },



    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 59,
                loop: true,
                speed: 0.15
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 44,
                loop: true,
                speed: 0.15
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 44,
                loop: true,
                speed: 0.15
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true,
                speed: 0.15
            }
        },

        window: {
            default: {
                from: 0,
                to: 36,
                loop: true
            },
            openWindow: {
                from: 37,
                to: 55,
                loop: false
            }
        },

        bunnyIntro: {
            default: {
                from: 0,
                to: 66,
                loop: false,
                speed: 0.4
            }
        },

        bunny: {
            default: {
                from: 0,
                to: 18,
                loop: true,
                speed: 0.4
            },
            whistle: {
                from: 19,
                to: 49,
                loop: false,
                speed: 0.4
            },
            throw: {
                from: 50,
                to: 74,
                loop: false,
                speed: 0.4
            },
            reload: {
                from: 75,
                to: 96,
                loop: false,
                speed: 0.4
            }
        },

        person1: {
            intro: {
                from: 0,
                to: 18,
                loop: false
            },
            smack: {
                from: 19,
                to: 76,
                loop: false
            },
            endLoop: {
                from: 77,
                to: 95,
                loop: true
            }
        },

        person2: {
            intro: {
                from: 0,
                to: 18,
                loop: false
            },
            smack: {
                from: 19,
                to: 76,
                loop: false
            },
            endLoop: {
                from: 77,
                to: 95,
                loop: true
            }
        },

        person3: {
            intro: {
                from: 0,
                to: 18,
                loop: false
            },
            smack: {
                from: 19,
                to: 76,
                loop: false
            },
            endLoop: {
                from: 77,
                to: 95,
                loop: true
            }
        },

        person4: {
            intro: {
                from: 0,
                to: 18,
                loop: false
            },
            smack: {
                from: 19,
                to: 76,
                loop: false
            },
            endLoop: {
                from: 77,
                to: 95,
                loop: true
            }
        },

        person5: {
            intro: {
                from: 0,
                to: 18,
                loop: false
            },
            smack: {
                from: 19,
                to: 76,
                loop: false
            },
            endLoop: {
                from: 77,
                to: 95,
                loop: true
            }
        }
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 185,
                    y: 485,
                    width: 86,
                    height: 87,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 86,
                    height: 87,
                }
            },
            lines: {
                container: {
                    x: 276,
                    y: 511,
                    width: 106,
                    height: 59,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 106,
                    height: 59,
                }
            },
            coins: {
                container: {
                    x: 390,
                    y: 511,
                    width: 105,
                    height: 59,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 105,
                    height: 59,
                }
            },
            maxLines: {
                container: {
                    x: 505,
                    y: 511,
                    width: 106,
                    height: 59,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 106,
                    height: 59,
                }
            },
            spin: {
                container: {
                    x: 619,
                    y: 511,
                    width: 125,
                    height: 58,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 125,
                    height: 58,
                }
            }
        },
        text: {
            credits: {
                container: {
                    x: 3,
                    y: 510
                },
                name: {
                    text: `CREDITS`,
                    x: 4,
                    y: 5,
                    style: {
                        fontSize: 18,
                        fontFamily: 'Calibri',
                        fontWeight: 100,
                        fill: 0xFFFFFF,
                        dropShadow : true,
                        dropShadowBlur: 1,
                        dropShadowColor : '#000000',
                        dropShadowAngle : Math.PI / 6,
                        dropShadowDistance : 2
                    }
                },
                value: {
                    text: `0`,
                    x: 120,
                    y: 5,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fontFamily: 'Calibri',
                        fontWeight: 100,
                        fill: 0xffcb00
                    }
                }
            },
            lines: {
                container: {
                    x: 282,
                    y: 473
                },
                value: {
                    text: `0`,
                    x: 47,
                    y: 2,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fontFamily: 'Calibri',
                        fill: 0xffcb00
                    }
                }
            },
            coins: {
                container: {
                    x: 399,
                    y: 473
                },
                value: {
                    text: `0`,
                    x: 47,
                    y: 2,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fontFamily: 'Calibri',
                        fill: 0xffcb00
                    }
                }
            },
            bet: {
                container: {
                    x: 505,
                    y: 472
                },
                name: {
                    text: `BET`,
                    x: 5,
                    y: 5,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 18,
                        fontFamily: 'Calibri',
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 111,
                    y: 4,
                    anchor: new PIXI.Point(1, 0),
                    style: {
                        fontSize: 22,
                        fontFamily: 'Calibri',
                        fill: 0xffcb00
                    }
                }
            },
            win: {
                container: {
                    x: 630,
                    y: 472
                },
                name: {
                    text: `PAID`,
                    x: 5,
                    y: 5,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 18,
                        fontFamily: 'Calibri',
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 115,
                    y: 4,
                    anchor: new PIXI.Point(1, 0),
                    style: {
                        fontSize: 22,
                        fontFamily: 'Calibri',
                        fill: 0xffcb00
                    }
                }
            }
        },
        selectList: {
            lines: {
                bottom: 59,
                left: 225
            },
            coins: {
                bottom: 59,
                left: 450
            }
        }
    },
    lines: {
      total: 100,
      lineWidth: 3,
      lineBorderWidth: 5,

      container: {
        x: 0,
        y: 77,
        width: 632,
        height: 360
      },

        //@todo get linesMap from server
        winLinesMapSymbols: winLinesMap,

      colors: getColorsForLines(),

      linesPoints: getPointsForLines(),
    },
    freegame: {
        container: {
            x: 0,
            y: 0,
            width: 760,
            height: 570
        },
        pinItemsCount: 12,
        maxBonusGameSteps: 3,
        congrats: {},
        bunny: {
            x: 280,
            y: 350
        },
        bunnyIntro: {
            x: 280,
            y: 325
        },
        items: [
            {x: 46, y: 63, nameAnimation: "window", typeAnimation: "default"},
            {x: 46, y: 184, nameAnimation: "window", typeAnimation: "default"},
            {x: 46, y: 305, nameAnimation: "window", typeAnimation: "default"},
            {x: 191, y: 143, nameAnimation: "window", typeAnimation: "default"},
            {x: 191, y: 263, nameAnimation: "window", typeAnimation: "default"},
            {x: 322, y: 143, nameAnimation: "window", typeAnimation: "default"},
            {x: 322, y: 263, nameAnimation: "window", typeAnimation: "default"},
            {x: 451, y: 143, nameAnimation: "window", typeAnimation: "default"},
            {x: 451, y: 263, nameAnimation: "window", typeAnimation: "default"},
            {x: 597, y: 63, nameAnimation: "window", typeAnimation: "default"},
            {x: 597, y: 184, nameAnimation: "window", typeAnimation: "default"},
            {x: 597, y: 305, nameAnimation: "window", typeAnimation: "default"}
        ],
        itemsScores: {
            text: ``,
            x: 30,
            y: 75,
            style: {
                fontSize: 26,
                fontFamily: 'Arial',
                fontWeight: 1000,
                fill: 0xff0000,
                dropShadow : true,
                dropShadowBlur: 1,
                dropShadowColor : '#000000',
                dropShadowAngle : Math.PI / 6,
                dropShadowDistance : 2
            }
        },
        snowballDefaultPosition: {
            x: 350,
            y: 420
        },
        snowballBezier: [
            [{x: 350, y: 420}, {x: 280, y: 120}, {x: 85,  y: 85}],
            [{x: 350, y: 420}, {x: 180, y: 130}, {x: 85,  y: 206}],
            [{x: 350, y: 420}, {x: 180, y: 220}, {x: 85,  y: 327}],
            [{x: 350, y: 420}, {x: 350, y: 220}, {x: 240, y: 165}],
            [{x: 350, y: 420}, {x: 330, y: 270}, {x: 240, y: 285}],
            [{x: 350, y: 420}, {x: 372, y: 150}, {x: 367, y: 165}],
            [{x: 350, y: 420}, {x: 372, y: 270}, {x: 367, y: 285}],
            [{x: 350, y: 420}, {x: 372, y: 270}, {x: 500, y: 165}],
            [{x: 350, y: 420}, {x: 372, y: 300}, {x: 500, y: 285}],
            [{x: 350, y: 420}, {x: 450, y: 120}, {x: 640, y: 85}],
            [{x: 350, y: 420}, {x: 450, y: 130}, {x: 640, y: 206}],
            [{x: 350, y: 420}, {x: 450, y: 220}, {x: 640, y: 327}],
        ],
        snowBallScalingParams: {
            scale: {
                from: 1,
                to: 0.5
            },
            progress: {
                from: 50,
                to: 100
            }
        },
        textPickAnObject: {
            x: 380,
            y: 50,
            width: 246,
            height: 50,
            anchor: new PIXI.Point(0.5, 0)
        },

        textPicksLeft: {
            text: `PICKS\nLEFT`,
            x: 90,
            y: 495,
            style: {
                fontSize: 26,
                fontFamily: 'Calibri',
                fontWeight: 1000,
                fill: 0xffffff,
                dropShadow : true,
                align: 'center',
                dropShadowBlur: 1,
                dropShadowColor : '#e87130',
                dropShadowAngle : Math.PI / 6,
                dropShadowDistance : 2
            }
        },
        textPicksLeftCount: {
            text: `0`,
            x: 50,
            y: 490,
            style: {
                fontSize: 55,
                fontFamily: 'Calibri',
                fontWeight: 1000,
                fill: 0xfeff02,
                dropShadow : true,
                dropShadowBlur: 1,
                dropShadowColor : '#e87130',
                dropShadowAngle : Math.PI / 6,
                dropShadowDistance : 2
            }
        }
    },

    freespins: {
        meterPositionContainer: {
            x: 650,
            y: 0
        },
        countText: {
            text: '00',
            x: 50,
            y: 27,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 30,
                fill: 0xffffff,
                fontFamily: 'Calibri',
                fontWeight: 1000,
                dropShadow : true,
                dropShadowBlur: 1,
                dropShadowColor : '#000000',
                dropShadowAngle : Math.PI / 6,
                dropShadowDistance : 2
            }
        }
    },

    infoWindows: {
        freeSpinsStart: {
            container: {
                x: 0,
                y: 0,
            },
            background: {
                image: 'payTable.png'
            },
            elements: [{
                type: 'text',
                key: 'youHaveWon',
                x: 380,
                y: 182,
                text: 'YOU\'\VE WON',
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 34,
                    fill: 0xffffff
                }
            }, {
                type: 'text',
                key: 'spins',
                x: 380,
                y: 272,
                text: '%spins',
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 124,
                    fill: 0xE9168C
                }
            }, {
                type: 'text',
                key: 'freeSpins',
                x: 380,
                y: 362,
                text: 'FREE SPINS',
                anchor: {x: 0.5, y: 0.5},
                style: {
                    fontSize: 34,
                    fill: 0xffffff
                }
            }, {
                type: 'text',
                key: 'clickForContinue',
                x: 380,
                y: 480,
                text: 'click for continue',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 22,
                    fill: 0xffffff
                }
            }]
        },
        freeSpinsEnd: {
            container: {
                x: 0,
                y: 0,
            },
            background: {
                image: 'payTable.png'
            },
            elements: [{
                type: 'sprite',
                key: 'iconFreeSpins.png',
                x: 240,
                y: 272,
                anchor: {x: 0.5, y: 0.5},
                image: 'iconFreeSpins.png'
            }, {
                type: 'text',
                key: 'freeSpinsComplete',
                x: 390,
                y: 222,
                text: '%spins FREE SPINS\nCOMPLETE',
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 30,
                    fill: 0xffffff
                }
            }, {
                type: 'text',
                key: 'youWonCoins',
                x: 390,
                y: 352,
                text: 'You won %coins coins!',
                anchor: {x: 0, y: 0.5},
                style: {
                    fontSize: 30,
                    fill: 0xffffff
                }
            }, {
                type: 'text',
                key: 'clickForContinue',
                x: 380,
                y: 480,
                text: 'click for continue',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 22,
                    fill: 0xffffff
                }
            }]
        },
        endBonusGame: {
            container: {
                x: 0,
                y: 0,
            },
            background: {
                type: 'rectangle',
                width: 760,
                height: 570,
                x: 0,
                y: 0,
                fill: 0x000000,
                alpha: 0.5,
                radius: 10
            },
            elements: [{
                type: 'text',
                key: 'coins',
                x: 380,
                y: 250,
                text: '%coins',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 45,
                    fontFamily: 'Arial',
                    fontWeight: 800,
                    fill: 0xFFFF00,
                    dropShadow : true,
                    dropShadowBlur: 1,
                    dropShadowColor : '#000000',
                    dropShadowAngle : Math.PI / 6,
                    dropShadowDistance : 2
                }
            }, {
                type: 'sprite',
                key: 'Text_Congratulations.png',
                x: 120,
                y: 70,
                width: 513,
                height: 56,
                image: 'Text_Congratulations.png'
            }, {
                type: 'sprite',
                key: 'TXT_WinSummary.png',
                x: 295,
                y: 170,
                width: 172,
                height: 196,
                image: 'TXT_WinSummary.png'
            }, {
                type: 'text',
                key: 'clickForContinue',
                x: 380,
                y: 480,
                text: 'click for continue',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 15,
                    fill: 0xffffff
                }
            }]
        }
    },

    soundManifest: [
        'bonus_music.mp3',
        'bonus_music_end.mp3',
        'bunny_intro.mp3',
        'bunny_throw.mp3',
        'bunny_whistle.mp3',
        'find_intro.mp3',
        'intro.mp3',
        'music_base_01.mp3',
        'people1_end.mp3',
        'people2_end.mp3',
        'people3_end.mp3',
        'people4_end.mp3',
        'people5_end.mp3',
        'people_smack.mp3',
        'reel_spin_01.mp3',
        'reel_stop_01.mp3',
        'reel_stop_02.mp3',
        'reel_stop_03.mp3',
        'reel_stop_04.mp3',
        'reel_stop_05.mp3',
        'sym_01.mp3',
        'sym_02.mp3',
        'sym_03.mp3',
        'sym_04.mp3',
        'sym_05.mp3',
        'sym_06.mp3',
        'sym_07.mp3',
        'sym_08.mp3',
        'sym_09.mp3',
        'sym_10.mp3',
        'sym_11.mp3',
        'sym_12_freespin.mp3',
        'sym_12_freespin_active.mp3',
        'window_select.mp3'
    ],
};

export default settings;

function getColorsForLines(countLines= 100) {
    let colorsMainList = [];
    let colorsBorderList = [];

    for(let i = 0; i < countLines; i++) {
        colorsMainList.push('0x' + Math.floor(Math.random()*16777215).toString(16));
        colorsBorderList.push('0x' + Math.floor(Math.random()*16777215).toString(16));
    }

    return {
        main: colorsMainList,
        border: colorsBorderList
    }
}

function getPointsForLine(lineMap, positionsXList, lineNumber, reelsCount = 5) {
    let linePoints = [];

    const helpOffsetPoint = ++offsetLineForXPosition[lineMap[0]];
    const helpOffset = helpOffsetPoint % 2 ? - helpOffsetPoint : helpOffsetPoint;
    const {
        width,
        height,
        offsetX,
        offsetY
    } = cellProps;

    const pointOffsetX = width + offsetX;
    const pointOffsetY = height + offsetY;

    const mainXPoint = width / 2;
    const mainYPoint = height / 2 + helpOffset;

    const indexLastItem =  reelsCount - 1;

    linePoints.push([
        0,
        mainYPoint + pointOffsetY * lineMap[0]
    ]);

    lineMap.forEach((element, index) => {
        linePoints.push([
            mainXPoint + pointOffsetX * index,
            mainYPoint + pointOffsetY * element
        ])
    });

    linePoints.push([
        width * reelsCount + offsetX * indexLastItem,
        mainYPoint + pointOffsetY * lineMap[indexLastItem]
    ]);
    return linePoints;
}

function getPointsForLines() {
    let linesMap = [];

    for(let item in winLinesMap) {
        linesMap.push(getPointsForLine(winLinesMap[item]))
    }

    return linesMap;
}
