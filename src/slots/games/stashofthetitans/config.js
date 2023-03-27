import * as PIXI from 'pixi.js';
import React from "react";

const cellProps = {
    width: 121,
    height: 121,
    offsetX: 7,
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
        width: 121,
        height: 121,
        offsetX: 7,
        offsetY: 0,
        startOffsetX: 0,
        startOffsetY: 0
    },
    reel: {
        totalCount: 5,
        container: {
            x: 64,
            y: -32
        },
        position: {
            x: 64,
            y: 0
        },
        cellDimensions: {
            width: 121,
            height: 121,
            offsetX: 7,
            offsetY: 0,
            startOffsetX: 0,
            startOffsetY: 0
        },
        colors: {
            common: '0xffffff',
            freegame: '0x000000'
        },
        offsetX: 7
    },

    symbols: {
        freegameSymbol: 11,
        freespinsSymbol: 12
    },

    symbolAnimation: {
        container: {
            x: 62,
            y: 90
        },
        framesCount: {
            sym_1: 87,
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
            sym_12: 116,
        },
    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.75
            }
        },
        gen1_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen1_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen2_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen2_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen3_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen3_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen4_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen4_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen5_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen5_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen6_intro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        gen6_outro: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            },
            selected: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.5
            }
        },
        lady_loop: {
            default: {
                from: 1,
                to: 57,
                loop: true,
                speed: 0.3
            }
        },
        lady_select: {
            default: {
                from: 1,
                to: 117,
                loop: false,
                speed: 0.6
            }
        },
        intro: {
            default: {
                from: 1,
                to: 78,
                loop: false,
                speed: 0.5
            }
        },
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 162,
                    y: 510,
                    width: 111,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 111,
                    height: 62,
                }
            },
            lines: {
                container: {
                    x: 278,
                    y: 508,
                    width: 111,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 111,
                    height: 62,
                }
            },
            coins: {
                container: {
                    x: 393,
                    y: 508,
                    width: 111,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 111,
                    height: 62,
                }
            },
            maxLines: {
                container: {
                    x: 508,
                    y: 508,
                    width: 111,
                    height: 62,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 111,
                    height: 62,
                }
            },
            spin: {
                container: {
                    x: 624,
                    y: 508,
                    width: 131,
                    height: 60,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 131,
                    height: 60,
                }
            }
        },
        text: {
            credits: {
                container: {
                    x: 20,
                    y: 472
                },
                bg: {
                    width: 120,
                    height: 86,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.8,
                    radius: 10
                },
                name: {
                    text: `COINS`,
                    x: 60,
                    y: 16,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 20,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 60,
                    y: 48,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 18,
                        fill: 0xff0000
                    }
                }
            },
            lines: {
                container: {
                    x: 310,
                    y: 472
                },
                bg: {
                    width: 52,
                    height: 24,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.8,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 26,
                    y: 12,
                    anchor: new PIXI.Point(0.5, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xff0000
                    }
                }
            },
            coins: {
                container: {
                    x: 420,
                    y: 472
                },
                bg: {
                    width: 52,
                    height: 24,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.8,
                    radius: 10
                },
                value: {
                    text: `0`,
                    x: 26,
                    y: 12,
                    anchor: new PIXI.Point(0.5, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xff0000
                    }
                }
            },
            bet: {
                container: {
                    x: 502,
                    y: 472
                },
                bg: {
                    width: 124,
                    height: 24,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.8,
                    radius: 10
                },
                name: {
                    text: `BET`,
                    x: 8,
                    y: 12,
                    anchor: new PIXI.Point(0, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 120,
                    y: 12,
                    anchor: new PIXI.Point(1, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xff0000
                    }
                }
            },
            win: {
                container: {
                    x: 632,
                    y: 472
                },
                bg: {
                    width: 124,
                    height: 24,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0.8,
                    radius: 10
                },
                name: {
                    text: `WIN`,
                    x: 8,
                    y: 12,
                    anchor: new PIXI.Point(0, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 120,
                    y: 12,
                    anchor: new PIXI.Point(1, 0.5),
                    style: {
                        fontSize: 18,
                        fill: 0xff0000
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
        total: 45,
        lineWidth: 3,
        lineBorderWidth: 5,

        position: {
            x: 64,
            y: 91
        },

        container: {
            x: 0,
            y: 77,
            width: 564,
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

        nameText: {
            text: 'PICKS\nLEFT',
            x: 125,
            y: 90,
            anchor: new PIXI.Point(0.5, 0.5),
            style: {
                align: 'center',
                fontSize: 14,
                fill: 0xffffff
            }
        },
        countText: {
            text: '0',
            x: 125,
            y: 56,
            anchor: new PIXI.Point(0.5, 0.5),
            style: {
                align: 'center',
                fontSize: 40,
                fill: 0xffffff
            }
        },

        congrats: {},

        intro: {
            x: 0,
            y: 0
        },

        ladyLoop: {
            x: 380,
            y: 100
        },

        ladySelect: {
            x: 380,
            y: 100
        },

        introItems: {
            item3: {
                x: 60,
                y: 55,
            },
            item1: {
                x: -20,
                y: 90,
            },
            item6: {
                x: 395,
                y: 70,
            },
            item2: {
                x: 30,
                y: 100,
            },
            item4: {
                x: 195,
                y: 45,
            },
            item5: {
                x: 285,
                y: 130,
            }
        },
        outroItems: {
            item1: {
                x: -20,
                y: 0,
            },
            item2: {
                x: -20,
                y: 22,
            },
            item3: {
                x: -8,
                y: -8,
            },
            item4: {
                x: -8,
                y: 12,
            },
            item5: {
                x: -6,
                y: 12,
            },
            item6: {
                x: -5,
                y: 2,
            }
        },
        scores: {
            stepForDigitX: 20,
            score1: {
                x: 80,
                y: 200,
            },
            score2: {
                x: 106,
                y: 210,
            },
            score3: {
                x: 138,
                y: 170,
            },
            score4: {
                x: 275,
                y: 170,
            },
            score5: {
                x: 370,
                y: 236,
            },
            score6: {
                x: 524,
                y: 185,
            }
        },
    },

    freespins: {
        background: 'freespins_bg.png',
        meterPositionContainer: {
            x: 640,
            y: 0
        },
        nameText: {
            text: 'FREESPINS',
            x: 48,
            y: 52,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 13,
                fill: 0xffffff
            }
        },
        countText: {
            text: '00',
            x: 48,
            y: 4,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 42,
                fill: 0xffffff
            }
        },
        notifications: {
            enabled: true,
            start: {
                background: 'freeSpinsNotification.png',
                x: 380,
                y: 272,
                elements: [{
                    type: 'text',
                    y: -90,
                    text: 'YOU\'\VE WON',
                    interactive: false,
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 36,
                        fill: 0xFD9526
                    }
                }, {
                    type: 'text',
                    text: '%spins',
                    interactive: false,
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 72,
                        fill: 0x1371FB
                    }
                }, {
                    type: 'text',
                    y: 90,
                    text: 'FREE SPINS',
                    interactive: false,
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 36,
                        fill: 0xFD9526
                    }
                }, {
                    type: 'text',
                    y: 160,
                    text: 'TAP TO CONTINUE',
                    interactive: false,
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 18,
                        fill: 0xFD9526
                    }
                }]
            },
            end: {
                background: 'freeSpinsNotification.png',
                x: 380,
                y: 272,
                elements: [{
                    type: 'sprite',
                    x: -140,
                    anchor: {x: 0.5, y: 0.5},
                    interactive: false,
                    image: 'iconFreeSpins.png'
                }, {
                    type: 'text',
                    x: 10,
                    y: -50,
                    text: '%spins FREE SPINS\nCOMPLETE',
                    interactive: false,
                    anchor: {x: 0, y: 0.5},
                    style: {
                        fontSize: 30,
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    x: 10,
                    y: 80,
                    text: 'You won %coins coins!',
                    interactive: false,
                    anchor: {x: 0, y: 0.5},
                    style: {
                        fontSize: 30,
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    y: 160,
                    text: 'TAP TO CONTINUE',
                    interactive: false,
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 18,
                        fill: 0xffffff
                    }
                }]
            }
        }
    },

    infoWindows: {},

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

function getColorsForLines(countLines = 100) {
    let colorsMainList = [];
    let colorsBorderList = [];

    for (let i = 0; i < countLines; i++) {
        colorsMainList.push('0x' + Math.floor(Math.random() * 16777215).toString(16));
        colorsBorderList.push('0x' + Math.floor(Math.random() * 16777215).toString(16));
    }

    return {
        main: colorsMainList,
        border: colorsBorderList
    }
}

function getPointsForLine(lineMap, positionsXList, lineNumber, reelsCount = 5) {
    let linePoints = [];

    const helpOffsetPoint = ++offsetLineForXPosition[lineMap[0]];
    const helpOffset = helpOffsetPoint % 2 ? -helpOffsetPoint : helpOffsetPoint;
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

    const indexLastItem = reelsCount - 1;

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

    for (let item in winLinesMap) {
        linesMap.push(getPointsForLine(winLinesMap[item]))
    }

    return linesMap;
}
