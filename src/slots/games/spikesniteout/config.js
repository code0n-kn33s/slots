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
            sym_1: 64,
            sym_2: 64,
            sym_3: 64,
            sym_4: 64,
            sym_5: 64,
            sym_6: 64,
            sym_7: 64,
            sym_8: 64,
            sym_9: 64,
            sym_10: 64,
            sym_11: 64,
            sym_12: 64,
        },



    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 59,
                loop: true
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 44,
                loop: true
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 44,
                loop: true
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 22,
                loop: true
            }
        },

        bonusTime: {
            default: {
                from: 0,
                to: 29,
                speed: 0.5,
                loop: true
            }
        },

        dog1_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog2_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog3_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog4_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog5_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog6_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },

        dog1_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog2_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog3_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog4_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog5_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        dog6_loop2: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },

        dog1_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },
        dog2_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },
        dog3_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },
        dog4_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },
        dog5_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },
        dog6_select: {
            default: {
                from: 0,
                to: 71,
                speed: 0.5,
                loop: false
            }
        },

        dogCard: {
            dog1: {
                from: 0,
                to: 80,
                speed: 0.5,
                loop: false
            },
            dog2: {
                from: 81,
                to: 161,
                speed: 0.5,
                loop: false
            },
            dog3: {
                from: 162,
                to: 242,
                speed: 0.5,
                loop: false
            },
            dog4: {
                from: 243,
                to: 323,
                speed: 0.5,
                loop: false
            },
            dog5: {
                from: 324,
                to: 404,
                speed: 0.5,
                loop: false
            },
            dog6: {
                from: 405,
                to: 485,
                speed: 0.5,
                loop: false
            }
        },

        card_splat: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: false
            }
        },
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 185,
                    y: 485,
                    width: 86,
                    height: 80,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 86,
                    height: 80,
                }
            },
            lines: {
                container: {
                    x: 285,
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
                    x: 397,
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
                    x: 625,
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
                    x: 18,
                    y: 476
                },
                bg: {
                    width: 160,
                    height: 85,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.0,
                    radius: 10
                },
                name: {
                    text: `COINS`,
                    x: 80,
                    y: 15,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 80,
                    y: 50,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            lines: {
                container: {
                    x: 318,
                    y: 476
                },
                bg: {
                    width: 75,
                    height: 32,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.0,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 16,
                    y: 16,
                    anchor: new PIXI.Point(0.5, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            coins: {
                container: {
                    x: 428,
                    y: 476
                },
                bg: {
                    width: 75,
                    height: 32,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.0,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 16,
                    y: 16,
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
                    y: 474
                },
                bg: {
                    width: 122,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.0,
                    radius: 10
                },
                name: {
                    text: `BET`,
                    x: 7,
                    y: 5,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 118,
                    y: 16,
                    anchor: new PIXI.Point(1, 0.5),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            win: {
                container: {
                    x: 620,
                    y: 474
                },
                bg: {
                    width: 122,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.0,
                    radius: 10
                },
                name: {
                    text: `WIN`,
                    x: 7,
                    y: 5,
                    anchor: new PIXI.Point(0, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 125,
                    y: 16,
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
        pinItemsCount: 6,
        container: {
            x: 0,
            y: 0,
            width: 760,
            height: 570
        },
        tableObjects: {
            x: 22,
            y: 390
        },

        bonusTime: {
            x: 494,
            y: 128
        },

        dog1: {
            x: 0,
            y: 191
        },
        dog2: {
            x: 120,
            y: 293
        },
        dog3: {
            x: 235,
            y: 265
        },
        dog4: {
            x: 380,
            y: 68
        },
        dog5: {
            x: 510,
            y: 300
        },
        dog6: {
            x: 586,
            y: 228
        },

        dogsCard: {
            x: 150,
            y: 120
        },

        scores: {
            stepForDigitX: 20,
            score1: {
                x: 185,
                y: 112 + 50,
            },
            score2: {
                x: 232,
                y: 128 + 50,
            },
            score3: {
                x: 305,
                y: 171 + 50,
            },
            score4: {
                x: 362,
                y: 157 + 50,
            },
            score5: {
                x: 455,
                y: 134 + 50,
            },
            score6: {
                x: 505,
                y: 122 + 50,
            }
        },

        cardSplat: {
            x: 250,
            y: 50
        },

        cardSplatTextContainer: {
            x: 330,
            y: 115
        },

        textCoins: {
            x: 16,
            y: 98
        },

        textAndPickAgain: {
            x: 2,
            y: 120
        },

        textScore: {
            text: `0`,
            x: 55,
            y: 20,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 35,
                fill: 0xff3f3f,
                dropShadow : true,
                dropShadowBlur: 1,
                dropShadowColor : '#000000',
                dropShadowAngle : Math.PI / 6,
                dropShadowDistance : 2
            }
        },
        itemsScores: {
            commonStyle: {
                text: ``,
                x: 30,
                y: 75,
                anchor: new PIXI.Point(0.5, 0),
                style: {
                    fontSize: 26,
                    fontFamily: 'Arial',
                    fontWeight: 1000,
                    fill: 0xfdf22b,
                    dropShadow : true,
                    dropShadowBlur: 1,
                    dropShadowColor : '#000000',
                    dropShadowAngle : Math.PI / 6,
                    dropShadowDistance : 2
                },
            },
            dog1: {x: 70, y: 380},
            dog2: {x: 180, y: 370},
            dog3: {x: 310, y: 350},
            dog4: {x: 440, y: 350},
            dog5: {x: 550, y: 370},
            dog6: {x: 670, y: 370}
        },



        pickAgainAnimation: {
            duration: 2,
            bezierType: "thru",
            defaultPosition: {
                x: 330,
                y: 115
            },
            bezierValue: [
                {y: 115 },
                {y: 120 },
                {y: 125 },
                {y: 130 },
                {y: 135 },
                {y: 140 },
                {y: 145 },
                {y: 150 }
            ]
        },
    },

    freespins: {
        meterPositionContainer: {
            x: 530,
            y: 0
        },
        countText: {
            text: '00',
            x: 123,
            y: 10,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 40,
                fill: 0xffffff
            }
        }
    },

    infoWindows: {
        paytable: {
            isRewriteMeComponent: true,
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
                text: 'BONUS FEATURE',
                x: 230,
                y: 240,
                style: {
                    fontSize: 28,
                    fontFamily: 'Saddlebag',
                    fill: 0xffff1f,
                }
            },
            bonusPays: [{
                text: '3 or more in an active pay line triggers the tightrope stunt bonus game!',
                x: 230,
                y: 280,
                style: {
                    fontSize: 19,
                    fontFamily: 'Saddlebag',
                    wordWrap: true,
                    wordWrapWidth: 300,
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
                    y: 410,
                    style: {
                        fontSize: 19,
                        fill: 'white',
                        fontFamily: 'Saddlebag',
                        wordWrap: true,
                        wordWrapWidth: 300
                    }
                },
                {text: '5 symbols - ', x: 230, y: 455, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 'white'}},
                {text: '2500 coins', x: 360, y: 455, style: {fontSize: 19, fontFamily: 'Saddlebag', fill: 0xffa826}},
            ],
            symbolPays: [
                {text: '5 - ',  x: 200, y: 135, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '6,000', x: 222, y: 135, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 200, y: 155, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '175',   x: 222, y: 155, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 200, y: 175, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '40',    x: 222, y: 175, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '2 - ',  x: 200, y: 195, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '8',     x: 222, y: 195, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 200, y: 255, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '5,000', x: 222, y: 255, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 200, y: 275, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '125',   x: 222, y: 275, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 200, y: 295, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '30',    x: 222, y: 295, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '2 - ',  x: 200, y: 315, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '7',     x: 222, y: 315, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 200, y: 380, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '2,000', x: 222, y: 380, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 200, y: 400, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '75',    x: 222, y: 400, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 200, y: 420, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '25',    x: 222, y: 420, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '2 - ',  x: 200, y: 440, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '6',     x: 222, y: 440, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 400, y: 135, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '650',   x: 422, y: 135, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 400, y: 155, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '60',    x: 422, y: 155, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 400, y: 175, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '20',    x: 422, y: 175, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 400, y: 255, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '230',   x: 422, y: 255, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 400, y: 275, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '50',    x: 422, y: 275, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 400, y: 295, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '15',    x: 422, y: 295, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 400, y: 380, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '170',   x: 422, y: 380, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 400, y: 400, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '50',    x: 422, y: 400, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 400, y: 420, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '15',    x: 422, y: 420, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 620, y: 135, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '120',   x: 642, y: 135, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 620, y: 155, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '25',    x: 642, y: 155, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 620, y: 175, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '10',    x: 642, y: 175, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 620, y: 255, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '85',    x: 642, y: 255, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 620, y: 275, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '15',    x: 642, y: 275, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 620, y: 295, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '8',     x: 642, y: 295, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},

                {text: '5 - ',  x: 620, y: 380, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '60',    x: 642, y: 380, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '4 - ',  x: 620, y: 400, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '10',    x: 642, y: 400, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
                {text: '3 - ',  x: 620, y: 420, style: {fontSize: 16, fill: 'white', fontFamily: 'ERASBD'}},
                {text: '5',     x: 642, y: 420, style: {fontSize: 16, fill: 0xffa826, fontFamily: 'ERASBD'}},
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

            buttons: {
                back: {
                    container: {
                        x: 200,
                        y: 510,
                        width: 101,
                        height: 60,
                        cursor: "pointer",
                        interactive: true
                    },
                    image: {
                        x: 0,
                        y: 0,
                        width: 101,
                        height: 60,
                    }
                },
                next: {
                    container: {
                        x: 460,
                        y: 510,
                        width: 101,
                        height: 60,
                        cursor: "pointer",
                        interactive: true
                    },
                    image: {
                        x: 0,
                        y: 0,
                        width: 101,
                        height: 60,
                    }
                },
                start: {
                    container: {
                        x: 330,
                        y: 510,
                        width: 101,
                        height: 60,
                        cursor: "pointer",
                        interactive: true
                    },
                    image: {
                        x: 0,
                        y: 0,
                        width: 101,
                        height: 60,
                    }
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
        'btn_base_01.wav',
        'btn_base_02.wav',
        'freespin_meter_intro.wav',
        'freespin_meter_outro.wav',
        'music_base_01.wav',
        'payline_01.wav',
        'payline_02.wav',
        'payline_03.wav',
        'payline_04.wav',
        'payline_05.wav',
        'reel_spin_01.wav',
        'reel_stop_01.wav',
        'reel_stop_02.wav',
        'reel_stop_03.wav',
        'reel_stop_04.wav',
        'reel_stop_05.wav',
        'sym_01.wav',
        'sym_02.wav',
        'sym_03.wav',
        'sym_04.wav',
        'sym_05.wav',
        'sym_06.wav',
        'sym_07.wav',
        'sym_08.wav',
        'sym_09.wav',
        'sym_10.wav',
        'sym_11.wav',
        'sym_12_bonus.wav',
        'sym_12_freespin.wav',
        'sym_12_freespin_active.wav',
        'tally_2000.wav',
        'tally_end.wav',
        'tally_long_loop.wav'
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
