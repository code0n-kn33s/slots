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
            sym_1: 116,
            sym_2: 87,
            sym_3: 87,
            sym_4: 87,
            sym_5: 87,
            sym_6: 87,
            sym_7: 87,
            sym_8: 87,
            sym_9: 87,
            sym_10: 87,
            sym_11: 87,
            sym_12: 87,
        }
    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 116,
                loop: true,
                speed: 0.5
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.4
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.5
            }
        },
        cannonClownABottom: {
            default: {
                from: 0,
                to: 21,
                loop: false
            }
        },
        cannonClownATop: {
            default: {
                from: 0,
                to: 21,
                loop: false
            }
        },
        cannonShot: {
            default: {
                from: 49,
                to: 65,
                loop: false
            }
        },
        cloudExplosion: {
            default: {
                from: 0,
                to: 29,
                loop: false
            }
        },
        bear: {
            default: {
                from: 0,
                to: 57,
                loop: true
            },
            selected: {
                from: 58,
                to: 115,
                loop: true
            }
        },
        announcerIdle: {
            default: {
                from: 0,
                to: 56,
                loop: true
            }
        },
        banner: {
            default: {
                from: 0,
                to: 11,
                loop: true
            }
        },
        bonusElephantLoop: {
            default: {
                from: 0,
                to: 57,
                loop: true
            }
        },
        bearClown: {
            selected: {
                from: 0,
                to: 57,
                loop: true
            }
        }
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 123,
                    y: 500,
                    width: 112,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 112,
                    height: 62,
                }
            },
            lines: {
                container: {
                    x: 242,
                    y: 500,
                    width: 112,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 112,
                    height: 62,
                }
            },
            coins: {
                container: {
                    x: 360,
                    y: 500,
                    width: 112,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 112,
                    height: 62
                }
            },
            maxLines: {
                container: {
                    x: 485,
                    y: 500,
                    width: 132,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 132,
                    height: 62,
                }
            },
            spin: {
                container: {
                    x: 620,
                    y: 500,
                    width: 130,
                    height: 60,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 130,
                    height: 60,
                }
            }
        },
        text: {
            credits: {
                container: {
                    x: 10,
                    y: 497
                },
                bg: {
                    width: 102,
                    height: 62,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.5,
                    radius: 10
                },
                name: {
                    text: `COINS`,
                    x: 51,
                    y: 5,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 18,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 51,
                    y: 30,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            lines: {
                container: {
                    x: 275,
                    y: 472
                },
                bg: {
                    width: 52,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.5,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 26,
                    y: 13,
                    anchor: new PIXI.Point(0.5, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            coins: {
                container: {
                    x: 391,
                    y: 472
                },
                bg: {
                    width: 52,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.5,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 26,
                    y: 13,
                    anchor: new PIXI.Point(0.5, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            bet: {
                container: {
                    x: 490,
                    y: 472
                },
                bg: {
                    width: 122,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.5,
                    radius: 10
                },
                name: {
                    text: `BET`,
                    x: 7,
                    y: 4,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 18,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 115,
                    y: 13,
                    anchor: new PIXI.Point(1, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            win: {
                container: {
                    x: 625,
                    y: 472
                },
                bg: {
                    width: 122,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.5,
                    radius: 10
                },
                name: {
                    text: `WIN`,
                    x: 7,
                    y: 4,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 18,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 115,
                    y: 13,
                    anchor: new PIXI.Point(1, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
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
        congrats: {},
        items: {
            item1: {
                x: 100,
                y: 40,
                scale: {
                    x: -1,
                    y: 1
                },
                pivot: {
                    x: 172,
                    y: 0
                }
            },
            item2: {
                x: 300,
                y: 40,
                scale: {
                    x: -1,
                    y: 1
                },
                pivot: {
                    x: 172,
                    y: 0
                }
            },
            item3: {
                x: 500,
                y: 40,
                scale: {
                    x: -1,
                    y: 1
                },
                pivot: {
                    x: 172,
                    y: 0
                }
            },
            item4: {
                x: 100,
                y: 200
            },
            item5: {
                x: 300,
                y: 200
            },
            item6: {
                x: 500,
                y: 200
            }
        },
        clouds: [
            {
                x: 100,
                y: 40
            },{
                x: 300,
                y: 40
            },{
                x: 500,
                y: 40
            },{
                x: 100,
                y: 200
            },{
                x: 300,
                y: 200
            },{
                x: 500,
                y: 200
            }
        ],
        scores: {
            stepForDigitX: 20,
            score1: {
                x: 200 - 40,
                y: 140 - 30,
            },
            score2: {
                x: 400 - 40,
                y: 140 - 30,
            },
            score3: {
                x: 600 - 40,
                y: 140 - 30,
            },
            score4: {
                x: 200 - 40,
                y: 300 - 30,
            },
            score5: {
                x: 400 - 40,
                y: 300 - 30,
            },
            score6: {
                x: 600 - 40,
                y: 300 - 30,
            }
        },

        // x={760 / 2 - 186 / 2} y={570 - 86}
        cannonDefaultPosition: {
            x: 760 / 2 - 186 / 2,
            y: 570
        },
        cannonBezier: [
            [{x: 200, y: 500}, {x: 100,  y: 484}],
            [{x: 760 / 2 - 186 / 2, y: 570}, {x: 760 / 2 - 186 / 2,  y: 570 - 86}],
            [{x: 374, y: 500}, {x: 500,  y: 484}],
            [{x: 200, y: 500}, {x: 100,  y: 484}],
            [{x: 760 / 2 - 186 / 2, y: 570}, {x: 760 / 2 - 186 / 2,  y: 570 - 86}],
            [{x: 374, y: 500}, {x: 500,  y: 484}]
        ],
        cannonShots: [
            {x: 45,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'},
            {x: 232,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'},
            {x: 445,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'},
            {x: 45,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'},
            {x: 232,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'},
            {x: 445,  y: 350, nameAnimation: 'cannonShot', typeAnimation: 'default'}
        ],
        clownFly: [
            {x: 100,  y: 50, nameAnimation: 'cannonClownATop', typeAnimation: 'default'},
            {x: 300,  y: 50, nameAnimation: 'cannonClownATop', typeAnimation: 'default'},
            {x: 500,  y: 50, nameAnimation: 'cannonClownATop', typeAnimation: 'default'},
            {x: 100,  y: 200, nameAnimation: 'cannonClownABottom', typeAnimation: 'default'},
            {x: 300,  y: 200, nameAnimation: 'cannonClownABottom', typeAnimation: 'default'},
            {x: 500,  y: 200, nameAnimation: 'cannonClownABottom', typeAnimation: 'default'}
        ],
        showPickABearAnimation: [
            {x: 70, y: 0-500},
            {x: 70, y: 100-500},
            {x: 70, y: 200-500},
            {x: 70, y: 310-500},
            {x: 70, y: 315-500},
            {x: 70, y: 310-500},
            {x: 70, y: 270-500},
            {x: 70, y: 250-500},
            {x: 70, y: 245-500},
            {x: 70, y: 242-500},
            {x: 70, y: 240-500},
            {x: 70, y: 242-500},
            {x: 70, y: 245-500},
            {x: 70, y: 250-500},
            {x: 70, y: 270-500},
            {x: 70, y: 310-500}
        ],
        hidePickABearAnimation: [
            {x: 70, y: 310-500},
            {x: 70, y: 100-500},
            {x: 70, y: 0-500}
        ],
        pickAgainAnimation: {
            duration: 3,
            bezierType: "thru",
            defaultPosition: {
                x: 760 / 2, y: 500,
                width: 0, height:0,
                anchor: new PIXI.Point(0.5, 0.5)
            },
            bezierValue: [
                {x: 760 / 2, y: 500, width: 0, height: 0},
                {x: 760 / 2, y: 500, width: 411, height: 53},
                {x: 760 / 2, y: 500, width: 450, height: 58},
                {x: 760 / 2, y: 500, width: 411, height: 53},
                {x: 760 / 2, y: 500, width: 450, height: 58},
                {x: 760 / 2, y: 500, width: 411, height: 53},
                {x: 760 / 2, y: 500, width: 450, height: 58},
                {x: 760 / 2, y: 500, width: 411, height: 53},
                {x: 760 / 2, y: 500, width: 0, height: 0}
            ]
        },
        picksImages: [
            'text_3_picks.png',
            'text_2_picks_left.png',
            'text_1_pick_left.png'
        ]
    },

    freespins: {
        meterPositionContainer: {
            x: 607,
            y: 3
        },
        countText: {
            text: '00',
            x: 60,
            y: 10,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 40,
                fill: 0xffffff
            }
        },
        notifications: {
            enabled: true,

        }
    },

    infoWindows: {
        paytable: {
            isNew: true,
            page1: {
                image: 'payTablePage1.png',
                x: 120,
                y: 300
            },
            page2: {
                image: 'payTablePage2.png',
                x: 330,
                y: 300
            },
            scatterTitle: {
                text: 'FREE SPINS SCATTER',
                x: 230,
                y: 105,
                style: {
                    fontSize: 28,
                    fontFamily: 'Saddlebag',
                    fill: 0xffff1f,
                }
            },
            scatterPays: [
                {text: '5 symbols - ', x: 230, y: 140, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 'white'}},
                {text: '20 free spins', x: 360, y: 140, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 0xffa826}},
                {text: '4 symbols - ', x: 230, y: 160, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 'white'}},
                {text: '15 free spins', x: 360, y: 160, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 0xffa826}},
                {text: '3 symbols - ', x: 230, y: 180, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 'white'}},
                {text: '10 free spins', x: 360, y: 180, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 0xffa826}},
            ],
            bonusTitle: {
                text: 'SURPRISE BONUS',
                x: 230,
                y: 240,
                style: {
                    fontSize: 28,
                    fontFamily: 'Saddlebag',
                    fill: 0xffff1f,
                }
            },
            bonusPays: [{
                text: '3 or more in an active pay line triggers the Circus bonus game!',
                x: 230,
                y: 280,
                style: {
                    fontSize: 19,
                    fontFamily: 'Saddlebag',
                    wordWrap: true,
                    wordWrapWidth: 460,
                    fill: 'white'
                }
            }],
            wildTitle: {
                text: 'WILD CARD',
                x: 230,
                y: 380,
                style: {
                    fontSize: 28,
                    fontFamily: 'Saddlebag',
                    fill: 0xffff1f,
                }
            },
            wildPays: [
                {
                    text: 'Substitutes for any symbol except scatter.',
                    x: 230,
                    y: 415,
                    style: {
                        fontSize: 19,
                        fill: 'white',
                        fontFamily: 'Saddlebag',
                        wordWrap: true,
                        wordWrapWidth: 460
                    }
                },
                {text: '5 symbols - ', x: 230, y: 435, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 'white'}},
                {text: '7,500 coins', x: 360, y: 435, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 0xffa826}},
            ],
            symbolPays: [
                {text: '5 - ', x: 190 + 60, y: 120, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '10,000', x: 225 + 60, y: 120, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 190 + 60, y: 140, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '1,000', x: 225 + 60, y: 140, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 190 + 60, y: 160, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '80', x: 225 + 60, y: 160, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '2 - ', x: 190 + 60, y: 180, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '5', x: 225 + 60, y: 180, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 190 + 60, y: 215, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '7,000', x: 225 + 60, y: 215, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 190 + 60, y: 235, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '500', x: 225 + 60, y: 235, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 190 + 60, y: 255, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '50', x: 225 + 60, y: 255, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '2 - ', x: 190 + 60, y: 275, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '5', x: 225 + 60, y: 275, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 190 + 60, y: 310, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '4,000', x: 225 + 60, y: 310, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 190 + 60, y: 330, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '100', x: 225 + 60, y: 330, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 190 + 60, y: 350, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '20', x: 225 + 60, y: 350, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '2 - ', x: 190 + 60, y: 370, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '4', x: 225 + 60, y: 370, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 190 + 60, y: 405, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '2,500', x: 225 + 60, y: 405, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 190 + 60, y: 425, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '80', x: 225 + 60, y: 425, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 190 + 60, y: 445, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '15', x: 225 + 60, y: 445, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '2 - ', x: 190 + 60, y: 465, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '3', x: 225 + 60, y: 465, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 550, y: 120, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '1,600', x: 585, y: 120, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 550, y: 140, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '50', x: 585, y: 140, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 550, y: 160, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '12', x: 585, y: 160, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 550, y: 190, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '900', x: 585, y: 190, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 550, y: 210, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '45', x: 585, y: 210, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 550, y: 230, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '10', x: 585, y: 230, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 550, y: 270, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '600', x: 585, y: 270, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 550, y: 290, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '30', x: 585, y: 290, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 550, y: 310, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '8', x: 585, y: 310, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 550, y: 340, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '300', x: 585, y: 340, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 550, y: 360, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '20', x: 585, y: 360, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 550, y: 380, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '6', x: 585, y: 380, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},

                {text: '5 - ', x: 550, y: 420, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '180', x: 585, y: 420, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '4 - ', x: 550, y: 440, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '15', x: 585, y: 440, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
                {text: '3 - ', x: 550, y: 460, style: {fontSize: 16, fill: 'white', fontFamily: 'Saddlebag'}},
                {text: '5', x: 585, y: 460, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'Saddlebag'}},
            ],
            pageTitle: {
                x: 380,
                y: 500,
                anchor: {
                    x: 0.5,
                    y: 0.5
                },
                style: {
                    align: 'center',
                    fontFamily: 'Saddlebag',
                    fontSize: 19,
                    fill: 0xFFFFFF,
                }
            },
            previousButton: {
                image: 'button_previous.png',
                x: 250,
                y: 540,
                interactive: true,
                buttonMode: true,
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            nextButton: {
                image: 'button_next.png',
                x: 510,
                y: 540,
                interactive: true,
                buttonMode: true,
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            },
            backButton: {
                image: 'button_back.png',
                x: 380,
                y: 540,
                interactive: true,
                buttonMode: true,
                anchor: {
                    x: 0.5,
                    y: 0.5
                }
            }
        },
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
                image: 'payTable.png'
            },
            elements: [{
                type: 'text',
                key: 'coins',
                x: 380,
                y: 300,
                text: '%coins',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 30,
                    fill: 0xffffff
                }
            }, {
                type: 'sprite',
                key: 'Text_Congratulations.png',
                x: 120,
                y: 70,
                width: 519,
                height: 111,
                image: 'Text_Congratulations.png'
            }, {
                type: 'sprite',
                key: 'TXT_WinSummary.png',
                x: 160,
                y: 170,
                width: 440,
                height: 300,
                image: 'TXT_WinSummary.png'
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
        }
    },

    soundManifest: [
        'bonus_music.mp3',
        'bonus_music_end.mp3',
        'bowling_01.mp3',
        'bowling_02.mp3',
        'bowling_03.mp3',
        'bowling_04.mp3',
        'bowling_05.mp3',
        'bowling_06.mp3',
        'btn_base_01.mp3',
        'cannon_move.mp3',
        'music_base_01.mp3',
        'next_ball.mp3',
        'reel_spin_01.mp3',
        'reel_stop_01.mp3',
        'reel_stop_02.mp3',
        'reel_stop_03.mp3',
        'reel_stop_04.mp3',
        'reel_stop_05.mp3',
        'selectionBonus.mp3',
        'snd_anticipation.mp3',
        'stop.mp3',
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
        'sym_12.mp3'
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
