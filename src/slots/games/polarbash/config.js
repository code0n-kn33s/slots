import * as PIXI from 'pixi.js';
import {Sprite, Text} from "react-pixi-fiber";
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
            common: '0xffffff',
            freegame: {
                image: 'freeSpins.png'
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
            sym_1: 88,
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
            sym_12: 117,
        }
    },

    animation: {
        symbol_1_anim: {
            default: {
                from: 0,
                to: 87,
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
                to: 116,
                loop: true,
                speed: 0.7
            }
        },
        walrus: {
            default: {
                from: 0,
                to: 27,
                speed: 0.4,
                loop: true
            }
        },
        dog: {
            default: {
                from: 0,
                to: 27,
                speed: 0.4,
                loop: true
            }
        },
        penguins: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: true
            }
        },
        snowman: {
            default: {
                from: 0,
                to: 27,
                speed: 0.4,
                loop: true
            }
        },
        hole_idle: {
            default: {
                from: 0,
                to: 27,
                speed: 0.4,
                loop: true
            }
        },
        line01: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line02: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line03: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line04: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line05: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line06: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line07: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line08: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line09: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line10: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line11: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line12: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line13: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line14: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        line15: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        },
        bear_idle: {
            default: {
                from: 0,
                to: 57,
                speed: 0.4,
                loop: true
            }
        },
        bear_casting: {
            default: {
                from: 0,
                to: 68,
                speed: 0.4,
                loop: false
            }
        },
        fish_anim: {
            default: {
                from: 0,
                to: 87,
                speed: 0.4,
                loop: false
            }
        }
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 140,
                    y: 493,
                    width: 113,
                    height: 69,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 113,
                    height: 69,
                }
            },
            lines: {
                container: {
                    x: 260,
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
                    x: 380,
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
                    x: 500,
                    y: 500,
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
                    x: 620,
                    y: 500,
                    width: 134,
                    height: 61,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 0,
                    y: 0,
                    width: 134,
                    height: 61,
                }
            }
        },
        text: {
            credits: {
                container: {
                    x: 17,
                    y: 478
                },
                bg: {
                    width: 102,
                    height: 62,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0,
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
                    x: 300,
                    y: 466
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
                    x: 415,
                    y: 465
                },
                bg: {
                    width: 52,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0,
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
                    x: 503,
                    y: 467
                },
                bg: {
                    width: 110,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0,
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
                    x: 100,
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
                    x: 630,
                    y: 467
                },
                bg: {
                    width: 110,
                    height: 26,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 0,
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
                    x: 100,
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
        pinItemsCount: 15,
        walrus: {
            x: 1,
            y: 45,
            nameAnimation: "walrus",
            typeAnimation: "default"
        },
        dog: {
            x: 130,
            y: 47,
            nameAnimation: "dog",
            typeAnimation: "default"
        },
        penguins: {
            x: 476,
            y: 24,
            nameAnimation: "penguins",
            typeAnimation: "default"
        },
        snowman: {
            x: 608,
            y: 37,
            nameAnimation: "snowman",
            typeAnimation: "default"
        },
        bear_idle: {
            x: 255,
            y: 2,
            nameAnimation: "bear_idle",
            typeAnimation: "default"
        },
        bear_casting: {
            x: 255,
            y: 2,
            nameAnimation: "bear_casting",
            typeAnimation: "default"
        },
        holes: [
            {
                default: {
                    x: 81, y: 246,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 39, y: 89,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 206, y: 246,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 164, y: 89,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 331, y: 246,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 289, y: 89,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 457, y: 246,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 415, y: 89,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 582, y: 246,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 540, y: 89,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 81, y: 357,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 39, y: 200,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 206, y: 357,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 164, y: 200,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 331, y: 357,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 289, y: 200,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 457, y: 357,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 415, y: 200,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 582, y: 357,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 540, y: 200,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 81, y: 468,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 39, y: 311,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 206, y: 468,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 164, y: 311,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 331, y: 468,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 289, y: 311,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 457, y: 468,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 415, y: 311,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
            {
                default: {
                    x: 582, y: 468,
                    nameAnimation: 'hole_idle',
                    typeAnimation: 'default'
                },
                selected: {
                    x: 540, y: 311,
                    nameAnimation: 'fish_anim',
                    typeAnimation: 'default'
                }
            },
        ],
        scores: {
            stepForDigitX: 15,
            score1: {
                x: 100,
                y: 185
            },
            score2: {
                x: 225,
                y: 185
            },
            score3: {
                x: 350,
                y: 185
            },
            score4: {
                x: 475,
                y: 185
            },
            score5: {
                x: 600,
                y: 185
            },
            score6: {
                x: 100,
                y: 296
            },
            score7: {
                x: 225,
                y: 296
            },
            score8: {
                x: 350,
                y: 296
            },
            score9: {
                x: 475,
                y: 296
            },
            score10: {
                x: 600,
                y: 296
            },
            score11: {
                x: 100,
                y: 407
            },
            score12: {
                x: 225,
                y: 407
            },
            score13: {
                x: 350,
                y: 407
            },
            score14: {
                x: 475,
                y: 407
            },
            score15: {
                x: 600,
                y: 407
            }
        },
        banner: {
            bezierValue: [
                {x: 180, y: -200},
                {x: 180, y: 50},
                {x: 180, y: 100},
                {x: 180, y: 110},
                {x: 180, y: 100},
                {x: 180, y: 50},
                {x: 180, y: -200}
            ],
            defaultPosition: {
                x: 180,
                y: -200
            },
            //bezierType: 'cubic',
            duration: 5
        },
        bannerImage: {
            x: 200, y: 50,
            anchor: {x: 0.5, y: 0.5}
        },
        bannerText: {
            x: 200, y: 10,
            anchor: {x: 0.5, y: 0.5}
        }
    },

    freespins: {
        meterPositionContainer: {
            x: 650,
            y: 0
        },
        countText: {
            text: '00',
            x: 43,
            y: 10,
            anchor: new PIXI.Point(0.5, 0),
            style: {
                fontSize: 40,
                fontFamily: 'Cooper Black',
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
                    fontSize: 30,
                    fontFamily: 'Cooper Black',
                    fill: 0x00aeef,
                }
            },
            scatterPays: [
                {text: '5 symbols - ', x: 230, y: 140, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xeae85e}},
                {text: '20 free spins', x: 340, y: 140, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xFFFFFF}},
                {text: '4 symbols - ', x: 230, y: 160, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xeae85e}},
                {text: '15 free spins', x: 340, y: 160, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xFFFFFF}},
                {text: '3 symbols - ', x: 230, y: 180, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xeae85e}},
                {text: '10 free spins', x: 340, y: 180, style: {fontSize: 20, fontFamily: 'Myriad Pro', fill: 0xFFFFFF}},
            ],
            bonusTitle: {
                text: 'SURPRISE BONUS',
                x: 230,
                y: 240,
                style: {
                    fontSize: 30,
                    fontFamily: 'Cooper Black',
                    fill: 0x00aeef,
                }
            },
            bonusPays: [{
                text: '3 or more in an active pay line triggers the Ice Fishing bonus game!',
                x: 230,
                y: 280,
                style: {
                    fontSize: 20,
                    fontFamily: 'Myriad Pro',
                    wordWrap: true,
                    wordWrapWidth: 300,
                    fill: 0xeae85e
                }
            }],
            wildTitle: {
                text: 'WILD CARD',
                x: 230,
                y: 380,
                style: {
                    fontSize: 30,
                    fontFamily: 'Cooper Black',
                    fill: 0x00aeef,
                }
            },
            wildPays: [
                {
                    text: 'Substitutes for any symbol except scatter.',
                    x: 230,
                    y: 410,
                    style: {
                        fontSize: 20,
                        fill: 0xeae85e,
                        fontFamily: 'Myriad Pro',
                        wordWrap: true,
                        wordWrapWidth: 300
                    }
                },
                {text: '5 symbols - ', x: 230, y: 455, style: {fontSize: 19, fontFamily: 'Myriad Pro', fill: 0xeae85e}},
                {text: '3,000 coins', x: 340, y: 455, style: {fontSize: 19, fontFamily: 'Myriad Pro', fill: 0xFFFFFF}},
            ],
            symbolPays: [
                {text: '5 - ', x: 190, y: 140, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '9,100', x: 210, y: 140, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 190, y: 160, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '400', x: 210, y: 160, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 190, y: 180, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '65', x: 210, y: 180, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '2 - ', x: 190, y: 200, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '4', x: 210, y: 200, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 190, y: 260, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '7,400', x: 210, y: 260, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 190, y: 280, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '200', x: 210, y: 280, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 190, y: 300, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '40', x: 210, y: 300, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '2 - ', x: 190, y: 320, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '4', x: 210, y: 320, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 190, y: 380, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '3,400', x: 210, y: 380, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 190, y: 400, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '150', x: 210, y: 400, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 190, y: 420, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '25', x: 210, y: 420, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '2 - ', x: 190, y: 440, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '3', x: 210, y: 440, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 410, y: 150, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '920', x: 430, y: 150, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 410, y: 170, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '65', x: 430, y: 170, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 410, y: 190, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '15', x: 430, y: 190, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 410, y: 270, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '200', x: 430, y: 270, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 410, y: 290, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '45', x: 430, y: 290, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 410, y: 310, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '10', x: 430, y: 310, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 410, y: 390, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '100', x: 430, y: 390, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 410, y: 410, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '35', x: 430, y: 410, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 410, y: 430, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '8', x: 430, y: 430, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 630, y: 150, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '90', x: 650, y: 150, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 630, y: 170, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '15', x: 650, y: 170, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 630, y: 190, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '6', x: 650, y: 190, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 630, y: 270, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '50', x: 650, y: 270, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 630, y: 290, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '8', x: 650, y: 290, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 630, y: 310, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '5', x: 650, y: 310, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},

                {text: '5 - ', x: 630, y: 390, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '35', x: 650, y: 390, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '4 - ', x: 630, y: 410, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '6', x: 650, y: 410, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
                {text: '3 - ', x: 630, y: 430, style: {fontSize: 16, fill: 0xfff200, fontFamily: 'Myriad Pro'}},
                {text: '4', x: 650, y: 430, style: {fontSize: 16, fill: 0xFFFFFF, fontFamily: 'Myriad Pro'}},
            ],
            pageTitle: {
                x: 380,
                y: 495,
                anchor: {
                    x: 0.5,
                    y: 0.5
                },
                style: {
                    align: 'center',
                    fontFamily: 'Myriad Pro',
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
                alpha: 0.86
            },
            elements: [
                {
                    type: 'text',
                    key: 'youHaveWon',
                    x: 380,
                    y: 200,
                    text: 'YOU\'\VE WON',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 44,
                        fontFamily: 'Cooper Black',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'spins',
                    x: 380,
                    y: 285,
                    text: '%spins',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 76,
                        fontFamily: 'Cooper Black',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'freeSpins',
                    x: 380,
                    y: 370,
                    text: 'FREE SPINS!',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 44,
                        fontFamily: 'Cooper Black',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'clickForContinue',
                    x: 380,
                    y: 420,
                    text: 'click for continue',
                    anchor: {x: 0.5, y: 0.5},
                    style: {
                        fontSize: 22,
                        fontFamily: 'Cooper Black',
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
                type: 'rectangle',
                width: 760,
                height: 570,
                x: 0,
                y: 0,
                fill: 0x000000,
                alpha: 0.86
            },
            elements: [
                {
                    type: "sprite",
                    key: 'iconFreeSpins',
                    x: 80,
                    y: 153,
                    width: 216,
                    height: 219,
                    image: "symbol_11.png"
                }, {
                    type: 'text',
                    key: 'freeSpinsComplete',
                    x: 330,
                    y: 180,
                    text: '%spins FREE SPINS\nCOMPLETE',
                    style: {
                        fontSize: 47,
                        fontFamily: 'Cooper Black',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'youWonCoins',
                    x: 330,
                    y: 300,
                    text: 'You won %coins coins!',
                    style: {
                        fontSize: 36,
                        fontFamily: 'Cooper Black',
                        fill: 0xffffff
                    }
                }, {
                    type: 'text',
                    key: 'clickForContinue',
                    x: 385,
                    y: 400,
                    text: 'click for continue',
                    anchor: {x: 0.5, y: 0},
                    style: {
                        fontSize: 22,
                        fontFamily: 'Cooper Black',
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
                image: 'freegame_bg.jpg'
            },
            elements: [{
                type: 'sprite',
                key: 'Text_Congratulations.png',
                anchor: {x: 0.5, y: 0},
                x: 380,
                y: 30,
                image: 'Text_Congratulations.png'
            }, {
                type: 'sprite',
                key: 'text_you_have_won_coins.png',
                anchor: {x: 0.5, y: 0},
                x: 380,
                y: 210,
                image: 'text_you_have_won_coins.png'
            }, {
                type: 'text',
                key: 'coins',
                x: 380,
                y: 270,
                text: '%coins',
                anchor: {x: 0.5, y: 0},
                style: {
                    fontSize: 90,
                    fontFamily: 'DomCasual LT',
                    fill: 0xffff01
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
        'btn_base_02.mp3',
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
        'sym_12.mp3',
        'banner.mp3',
        'line_cast.mp3',
        'fish.mp3'
    ]
};

export default settings;

function getColorsForLines(countLines= 100) {
    let colorsMainList = [
        "0xec1c24", "0xf48120", "0x72be44", "0x00a551", "0x00adee", "0x0071bb", "0xfcb813", "0xeb008b",
        "0xb3559f", "0x80298f", "0x00a9ac", "0x5b57a4", "0xf186b6", "0xcd7b2d", "0xf48366", "0x8680bc",
        "0xce9b62", "0xf05b4e", "0xb8292f", "0x932c61"
    ];

    for(let i = colorsMainList.length; i < countLines; i++) {
        colorsMainList.push('0x' + Math.floor(Math.random()*16777215).toString(16));
    }

    return {
        main: colorsMainList,
        border: colorsMainList
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
