import * as PIXI from 'pixi.js';
import {Text} from "react-pixi-fiber";
import React from "react";

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
            common: '0x000000',
            freegame: {
                image: 'freeSpinsReels.png'
            }
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
            sym_1: 117,
            sym_2: 88,
            sym_3: 88,
            sym_4: 88,
            sym_5: 88,
            sym_6: 88,
            sym_7: 88,
            sym_8: 88,
            sym_9: 88,
            sym_10: 88,
            sym_11: 88,
            sym_12: 88,
        }
    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 116,
                loop: true,
                speed: 0.7
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 87,
                loop: true,
                speed: 0.7
            }
        },
        girl_loop: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: true
            }
        },
        girl_select: {
            default: {
                from: 0,
                to: 57,
                speed: 0.5,
                loop: false
            }
        },
        card1Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card2Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card3Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card4Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card5Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card6Loop: {
            default: {
                from: 0,
                to: 69,
                speed: 0.5,
                loop: true
            }
        },
        card1Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card2Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card3Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card4Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card5Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card6Click: {
            default: {
                from: 0,
                to: 13,
                loop: false
            }
        },
        card1_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        card2_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        card3_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        card4_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        card5_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        card6_select: {
            default: {
                from: 0,
                to: 42,
                loop: false,
                speed: 0.5
            }
        },
        fortuneDirection: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        },
        fortuneFortune: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        },
        fortuneLovers: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        },
        fortuneMoon: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        },
        fortuneStar: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        },
        fortuneSun: {
            default: {
                from: 0,
                to: 81,
                loop: false,
                speed: 0.5
            }
        }
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 130,
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
                    x: 250,
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
                    x: 370,
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
                    x: 17,
                    y: 488
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
                    x: 281,
                    y: 471
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
                    x: 403,
                    y: 471
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
                    y: 468
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
                    x: 623,
                    y: 468
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
        banner: {
            x: 180,
            y: -200
        },
        bannerBezier: [
            {x: 180, y: -200},
            {x: 180, y: 0},
            {x: 180, y: 0},
            {x: 180, y: 0},
            {x: 180, y: 0},
            {x: 180, y: 0},
            {x: 180, y: 0},
            {x: 180, y: -200}
        ],
        girl: {
            x: 250,
            y: 82,
            typeAnimation: 'default'
        },
        selectedItems: {
            item1: {
                x: 120,
                y: 253,
            },
            item2: {
                x: 308,
                y: 122,
            },
            item3: {
                x: 316,
                y: 258,
            },
            item4: {
                x: 16,
                y: 260
            },
            item5: {
                x: 300,
                y: 110
            },
            item6: {
                x: 315,
                y: 257
            }
        },
        items: {
            item1: {
                x: 185,
                y: 362,
            },
            item2: {
                x: 325,
                y: 362,
            },
            item3: {
                x: 450,
                y: 362,
            },
            item4: {
                x: 120,
                y: 440
            },
            item5: {
                x: 306,
                y: 440
            },
            item6: {
                x: 470,
                y: 440
            }
        },
        cardAnimationTimeout: 1000,
        cardAnimationPosition: {
            x: 310,
            y: 265,
            typeAnimation: 'default'
        },
        showScoreTimeout: 1500,
        scores: {
            scoreText: {
                x: 760 / 2 - 110,
                y: 170,
                key: 'score',
                style: {
                    align: 'center',
                    fill: 'white',
                    fontFamily: 'Belwe Bd BT',
                    fontSize: 90
                }
            },
            coinsText: {
                text: 'COINS',
                x: 760 / 2 - 35,
                y: 370,
                key: 'coins',
                style: {
                    align: 'center',
                    fill: 'white',
                    fontFamily: 'Belwe Lt BT',
                    fontSize: 20
                }
            },
            plusText: {
                text: 'PLUS',
                x: 760 / 2 - 27,
                y: 395,
                key: 'plus',
                style: {
                    align: 'center',
                    fill: 'yellow',
                    fontFamily: 'Belwe Lt BT',
                    fontSize: 20
                }
            },
            pickAgainText: {
                text: 'PICK AGAIN',
                x: 760 / 2 - 58,
                y: 415,
                key: 'pick_again',
                style: {
                    align: 'center',
                    fill: 'white',
                    fontFamily: 'Belwe Lt BT',
                    fontSize: 20
                }
            }
        }
    },

    freespins: {
        meterPositionContainer: {
            x: 607,
            y: 3
        },
        countText: {
            text: '00',
            x: 70,
            y: 20,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 40,
                fill: 0xffffff
            }
        },
        notifications: {
            enabled: true
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
                    fontFamily: 'Belwe Bd BT',
                    fill: 0xee942c,
                }
            },
            scatterPays: [
                {text: '5 symbols - ', x: 230, y: 140, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xFFFFFF}},
                {text: '20 free spins', x: 340, y: 140, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xc9b830}},
                {text: '4 symbols - ', x: 230, y: 160, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xFFFFFF}},
                {text: '15 free spins', x: 340, y: 160, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xc9b830}},
                {text: '3 symbols - ', x: 230, y: 180, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xFFFFFF}},
                {text: '10 free spins', x: 340, y: 180, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xc9b830}},
            ],
            bonusTitle: {
                text: 'SURPRISE BONUS',
                x: 230,
                y: 240,
                style: {
                    fontSize: 28,
                    fontFamily: 'Belwe Bd BT',
                    fill: 0xee942c,
                }
            },
            bonusPays: [{
                text: '3 or more in an active pay line triggers the Gypsy Fortune bonus game!',
                x: 230,
                y: 280,
                style: {
                    fontSize: 19,
                    fontFamily: 'Belwe Bd BT',
                    wordWrap: true,
                    wordWrapWidth: 300,
                    fill: 0xFFFFFF
                }
            }],
            wildTitle: {
                text: 'WILD CARD',
                x: 230,
                y: 380,
                style: {
                    fontSize: 28,
                    fontFamily: 'Belwe Bd BT',
                    fill: 0xee942c,
                }
            },
            wildPays: [
                {
                    text: 'Substitutes for any symbol except scatter.',
                    x: 230,
                    y: 410,
                    style: {
                        fontSize: 19,
                        fill: 0xFFFFFF,
                        fontFamily: 'Belwe Bd BT',
                        wordWrap: true,
                        wordWrapWidth: 300
                    }
                },
                {text: '5 symbols - ', x: 230, y: 455, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xFFFFFF}},
                {text: '3,000 coins', x: 340, y: 455, style: {fontSize: 19, fontFamily: 'Belwe Bd BT', fill: 0xc9b830}},
            ],
            symbolPays: [
                {text: '5 - ', x: 190 + 60, y: 120, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '10,000', x: 215 + 60, y: 120, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 190 + 60, y: 140, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '175', x: 215 + 60, y: 140, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 190 + 60, y: 160, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '30', x: 215 + 60, y: 160, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '2 - ', x: 190 + 60, y: 180, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '3', x: 215 + 60, y: 180, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 190 + 60, y: 215, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '6,200', x: 215 + 60, y: 215, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 190 + 60, y: 235, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '130', x: 215 + 60, y: 235, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 190 + 60, y: 255, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '22', x: 215 + 60, y: 255, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '2 - ', x: 190 + 60, y: 275, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '3', x: 215 + 60, y: 275, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 190 + 60, y: 310, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '3,600', x: 215 + 60, y: 310, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 190 + 60, y: 330, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '85', x: 215 + 60, y: 330, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 190 + 60, y: 350, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '18', x: 215 + 60, y: 350, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '2 - ', x: 190 + 60, y: 370, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '2', x: 215 + 60, y: 370, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 190 + 60, y: 410, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '650', x: 215 + 60, y: 410, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 190 + 60, y: 430, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '60', x: 215 + 60, y: 430, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 190 + 60, y: 450, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '15', x: 215 + 60, y: 450, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 550, y: 120, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '250', x: 575, y: 120, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 550, y: 140, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '45', x: 575, y: 140, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 550, y: 160, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '11', x: 575, y: 160, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 550, y: 190, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '120', x: 575, y: 190, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 550, y: 210, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '25', x: 575, y: 210, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 550, y: 230, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '8', x: 575, y: 230, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 550, y: 270, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '75', x: 575, y: 270, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 550, y: 290, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '15', x: 575, y: 290, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 550, y: 310, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '7', x: 575, y: 310, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 550, y: 340, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '40', x: 575, y: 340, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 550, y: 360, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '10', x: 575, y: 360, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 550, y: 380, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '6', x: 575, y: 380, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},

                {text: '5 - ', x: 550, y: 420, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '25', x: 575, y: 420, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '4 - ', x: 550, y: 440, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '8', x: 575, y: 440, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
                {text: '3 - ', x: 550, y: 460, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Belwe Lt BT'}},
                {text: '5', x: 575, y: 460, style: {fontSize: 16, fill: 0xc9b830, fontFamily: 'Belwe Lt BT'}},
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
                    fontFamily: 'Belwe Lt BT',
                    fontSize: 19,
                    fill: 0xFFFFFF,
                }
            },
            previousButton: {
                image: 'button_previous_default.png',
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
                image: 'button_next_default.png',
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
                image: 'button_back_default.png',
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
                x: 45,
                y: 80,
            },
            background: {
                image: 'freeSpinsStart.png'
            },
            elements: [
                {
                    type: 'text',
                    key: 'youHaveWon',
                    x: 335,
                    y: 52,
                    text: 'YOU\'\VE WON',
                    anchor: {x: 0.5, y: 0},
                    style: {
                        fontSize: 36,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'spins',
                    x: 335,
                    y: 172,
                    text: '%spins',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 72,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xfff100
                    }
                }, {
                    type: 'text',
                    key: 'freeSpins',
                    x: 335,
                    y: 280,
                    text: 'FREE SPINS!',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 48,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'clickForContinue',
                    x: 335,
                    y: 320,
                    text: 'click for continue',
                    anchor: {x: 0.5, y: 0},
                    style: {
                        fontSize: 22,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
            }]
        },
        freeSpinsEnd: {
            container: {
                x: 45,
                y: 80,
            },
            background: {
                image: 'freeSpinsComplete.png'
            },
            elements: [
                {
                    type: 'text',
                    key: 'freeSpinsComplete',
                    x: 335,
                    y: 50,
                    text: '%spins FREE SPINS COMPLETE',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 36,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'youWonCoins',
                    x: 430,
                    y: 172,
                    text: 'You won %coins coins!',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 36,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'clickForContinue',
                    x: 335,
                    y: 320,
                    text: 'click for continue',
                    anchor: {x: 0.5, y: 0},
                    style: {
                        fontSize: 22,
                        fontFamily: 'Belwe Bd BT',
                        fill: 0xffffff
                    }
                }
            ]
        },
        endBonusGame: {
            container: {
                x: 0,
                y: 0,
            },
            background: {
                image: 'freegame_bg.png'
            },
            elements: [{
                type: 'sprite',
                key: 'Text_Congratulations.png',
                anchor: {x: 0.5, y: 0},
                x: 380,
                y: 140,
                image: 'Text_Congratulations.png'
            }, {
                type: 'text',
                key: 'coins',
                x: 380,
                y: 240,
                text: '%coins',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 90,
                    fontFamily: 'Belwe Bd BT',
                    fill: 0xff0000
                }
            }, {
                type: 'sprite',
                key: 'Text_Coins.png',
                anchor: {x: 0.5, y: 0},
                x: 380,
                y: 360,
                image: 'Text_Coins.png'
            }]
        }
    },

    soundManifest: [
        'banner_intro.mp3',
        'bonus_music.mp3',
        'bonus_music_end.mp3',
        'bowling_01.mp3',
        'bowling_02.mp3',
        'bowling_03.mp3',
        'bowling_04.mp3',
        'bowling_05.mp3',
        'bowling_06.mp3',
        'btn_base_01.mp3',
        'btn_base_02.mp3',
        'card_anim.mp3',
        'music_base_01.mp3',
        'next_ball.mp3',
        'reel_spin_01.mp3',
        'reel_stop_01.mp3',
        'reel_stop_02.mp3',
        'reel_stop_03.mp3',
        'reel_stop_04.mp3',
        'reel_stop_05.mp3',
        'selectionBonus.mp3',
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
