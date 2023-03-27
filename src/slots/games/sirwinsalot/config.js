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
            sym_3: 45,
            sym_4: 45,
            sym_5: 45,
            sym_6: 45,
            sym_7: 45,
            sym_8: 45,
            sym_9: 45,
            sym_10: 45,
            sym_11: 45,
            sym_12: 45,
        }
    },

    animation: {
        bartenderWalk: {
            default: {
                from: 0,
                to: 56,
                loop: false
            },
            reverse: {
                from: 56,
                to: 111,
                loop: false
            },
            brtComeBack: {
                from: 100,
                to: 119,
                loop: false
            },
            brtWalkToMug1: {
                from: 0,
                to: 10,
                loop: false
            },
            brtWalkToMug2: {
                from: 0,
                to: 20,
                loop: false
            },
            brtWalkToMug3: {
                from: 0,
                to: 30,
                loop: false
            },
            brtWalkToMug4: {
                from: 0,
                to: 40,
                loop: false
            },
            brtWalkToMug5: {
                from: 0,
                to: 45,
                loop: false
            },
            brtWalkToMug6: {
                from: 0,
                to: 55,
                loop: false
            },
            brtWalkToMug7: {
                from: 0,
                to: 10,
                loop: false
            },
            brtWalkToMug8: {
                from: 0,
                to: 20,
                loop: false
            },
            brtWalkToMug9: {
                from: 0,
                to: 30,
                loop: false
            },
            brtWalkToMug10: {
                from: 0,
                to: 40,
                loop: false
            },
            brtWalkToMug11: {
                from: 0,
                to: 45,
                loop: false
            },
            brtWalkToMug12: {
                from: 0,
                to: 55,
                loop: false
            },
            brtWalkFromMugToKnight1: {
                from: 12,
                to: 16,
                loop: false
            },
            brtWalkFromMugToKnight2: {
                from: 95,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight3: {
                from: 90,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight4: {
                from: 76,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight5: {
                from: 66,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight6: {
                from: 56,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight7: {
                from: 12,
                to: 16,
                loop: false
            },
            brtWalkFromMugToKnight8: {
                from: 95,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight9: {
                from: 90,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight10: {
                from: 76,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight11: {
                from: 66,
                to: 100,
                loop: false
            },
            brtWalkFromMugToKnight12: {
                from: 56,
                to: 100,
                loop: false
            },
            brtWalkFromKnightToStart1: {
                from: 0,
                to: 10,
                loop: false
            },
            brtWalkFromKnightToStart2: {
                from: 0,
                to: 20,
                loop: false
            },
            brtWalkFromKnightToStart3: {
                from: 0,
                to: 30,
                loop: false
            },
            brtWalkFromKnightToStart4: {
                from: 0,
                to: 40,
                loop: false
            },
            brtWalkFromKnightToStart5: {
                from: 0,
                to: 48,
                loop: false
            },
            brtWalkFromKnightToStart6: {
                from: 0,
                to: 56,
                loop: false
            },
            brtWalkFromKnightToStart7: {
                from: 0,
                to: 10,
                loop: false
            },
            brtWalkFromKnightToStart8: {
                from: 0,
                to: 20,
                loop: false
            },
            brtWalkFromKnightToStart9: {
                from: 0,
                to: 30,
                loop: false
            },
            brtWalkFromKnightToStart10: {
                from: 0,
                to: 40,
                loop: false
            },
            brtWalkFromKnightToStart11: {
                from: 0,
                to: 48,
                loop: false
            },
            brtWalkFromKnightToStart12: {
                from: 0,
                to: 56,
                loop: false
            }
        },
        bartenderMugGrab: {
            default: {
                from: 0,
                to: 9,
                loop: false
            }
        },
        bartenderMugGive: {
            default: {
                from: 0,
                to: 33,
                loop: false
            }
        },
        knightDrink: {
            default: {
                from: 0,
                to: 87,
                loop: false
            }
        },
        bartenderLoop: {
            default: {
                from: 0,
                to: 11,
                loop: true
            }
        },
        mugLoop: {
            default: {
                from: 0,
                to: 18,
                loop: true
            },
            selected: {
                from: 0,
                to: 18,
                loop: false
            }
        },
        lutePlayerLoop: {
            default: {
                from: 0,
                to: 27,
                loop: true
            }
        },
        torch: {
            default: {
                from: 0,
                to: 27,
                loop: true
            }
        },
        girlLoop: {
            default: {
                from: 0,
                to: 27,
                loop: true
            }
        },
        knightLoop: {
            default: {
                from: 0,
                to: 57,
                loop: true
            }
        },

        symbol_1_anim: {
            default: {
                from: 0,
                to: 60,
                loop: true
            }
        },
        symbol_2_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_3_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_4_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_5_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_6_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_7_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_8_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_9_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_10_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_11_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },
        symbol_12_anim: {
            default: {
                from: 0,
                to: 45,
                loop: true
            }
        },

        dumbpster: {
            default: {
                from: 1,
                to: 30,
                loop: true
            }
        }
    },

    controls: {
        buttons: {
            payout: {
                container: {
                    x: 25,
                    y: 440,
                    weight: 113,
                    height: 29,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 10,
                    y: 30,
                    width: 113,
                    height: 29,
                }
            },
            lines: {
                container: {
                    x: 160,
                    y: 475,
                    weight: 133,
                    height: 58,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 10,
                    y: 30,
                    width: 133,
                    height: 58,
                }
            },
            coins: {
                container: {
                    x: 310,
                    y: 475,
                    weight: 133,
                    height: 58,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 10,
                    y: 30,
                    width: 133,
                    height: 58,
                }
            },
            maxLines: {
                container: {
                    x: 460,
                    y: 475,
                    weight: 133,
                    height: 58,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 10,
                    y: 30,
                    width: 133,
                    height: 58,
                }
            },
            spin: {
                container: {
                    x: 610,
                    y: 475,
                    weight: 133,
                    height: 58,
                    cursor: "pointer",
                    interactive: true
                },
                image: {
                    x: 10,
                    y: 30,
                    width: 133,
                    height: 58,
                }
            }
        },
        text: {
            credits: {
                container: {
                    x: 5,
                    y: 497
                },
                bg: {
                    width: 150,
                    height: 70,
                    x: 0,
                    y: 0,
                    fill: 0x000000,
                    alpha: 1,
                    radius: 10
                },
                name: {
                    text: `COINS`,
                    x: 75,
                    y: 5,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 16,
                        fill: 0xFFFFFF
                    }
                },
                value: {
                    text: `0`,
                    x: 115,
                    y: 35,
                    anchor: new PIXI.Point(0.5, 0),
                    style: {
                        fontSize: 22,
                        fill: 0xff3f3f
                    }
                }
            },
            lines: {
                container: {
                    x: 282,
                    y: 470
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
                        fontSize: 18,
                        fill: 0xff3f3f
                    }
                }
            },
            coins: {
                container: {
                    x: 391,
                    y: 470
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
                        fontSize: 18,
                        fill: 0xff3f3f
                    }
                }
            },
            bet: {
                container: {
                    x: 490,
                    y: 470
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
                    y: 5,
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
                    x: 630,
                    y: 470
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
                    y: 5,
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

        linesNumber: {
            commonParams: {
                y: 250,
                cursor: "pointer",
                interactive: true
            },
            left: {
                x: 28,
            },
            right: {
                x: 710
            }
        }
    },
    freegame: {
        container: {
            x: 0,
            y: 0,
            width: 760,
            height: 570
        },
        pinItemsCount: 12,
        maxBonusGameSteps: 12,
        barTable: {
            x: 0,
            y: 355
        },
        items: {
            item1: {
                x: 150,
                y: 330,
            },
            item2: {
                x: 150 + 85,
                y: 330 - 15,
            },
            item3: {
                x: 150 + 85 * 2,
                y: 330 - 20,
            },
            item4: {
                x: 150 + 85 * 3,
                y: 330 - 20,
            },
            item5: {
                x: 150 + 85 * 4,
                y: 330 - 15,
            },
            item6: {
                x: 150 + 85 * 5,
                y: 330,
            },
            item7: {
                x: 150,
                y: 330 + 100,
            },
            item8: {
                x: 150 + 85,
                y: 330 + 100 - 15,
            },
            item9: {
                x: 150 + 85 * 2,
                y: 330 + 100 - 20,
            },
            item10: {
                x: 150 + 85 * 3,
                y: 330 + 100 - 20,
            },
            item11: {
                x: 150 + 85 * 4,
                y: 330 + 100 - 15,
            },
            item12: {
                x: 150 + 85 * 5,
                y: 330 + 100,
            }
        },
        scoreMugs: {
            scoreMug1: {
                x: 165,
                y: 380,
                value: 470
            },
            scoreMug2: {
                x: 255,
                y: 370,
                value: 240
            },
            scoreMug3: {
                x: 345,
                y: 360,
                value: 610
            },
            scoreMug4: {
                x: 430,
                y: 360,
                value: 430
            },
            scoreMug5: {
                x: 515,
                y: 370,
                value: 120
            },
            scoreMug6: {
                x: 595,
                y: 380,
                value: 790
            },
            scoreMug7: {
                x: 155,
                y: 480,
                value: 650
            },
            scoreMug8: {
                x: 260,
                y: 470,
                value: 480
            },
            scoreMug9: {
                x: 345,
                y: 460,
                value: 760
            },
            scoreMug10: {
                x: 425,
                y: 460,
                value: 380
            },
            scoreMug11: {
                x: 505,
                y: 470,
                value: 720
            },
            scoreMug12: {
                x: 595,
                y: 480,
                value: 680
            }
        },
        mugGrabs: {
            mugGrab1: {
                x: 50,
                y: 280,
            },
            mugGrab2: {
                x: 150,
                y: 280,
            },
            mugGrab3: {
                x: 250,
                y: 280,
            },
            mugGrab4: {
                x: 330,
                y: 280,
            },
            mugGrab5: {
                x: 400,
                y: 280,
            },
            mugGrab6: {
                x: 500,
                y: 280,
            },
            mugGrab7: {
                x: 50,
                y: 280,
            },
            mugGrab8: {
                x: 150,
                y: 280,
            },
            mugGrab9: {
                x: 250,
                y: 280,
            },
            mugGrab10: {
                x: 330,
                y: 280,
            },
            mugGrab11: {
                x: 400,
                y: 280,
            },
            mugGrab12: {
                x: 500,
                y: 280,
            }
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
        'drink_scene.mp3',
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
