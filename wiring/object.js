/**
 * assets/jsons/system.json
 */

var EQUIPMENT_LIST = [
    {
        name: 'HYDRONICS',
        equipment: [
            {
                name: '2-Way Valve',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/2-way-valve.svg',
                width: 40,
                height: 45,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 26
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 26
                    }
                ]
            },
            {
                name: '3-Way Valve',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/3-way-valve.svg',
                width: 40,
                height: 45,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 23
                    },
                    {
                        id: 3,
                        direct: 3,
                        method: CONNECTION_METHODS.OUT_TOP_BOTTOM,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 11
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 23
                    }
                ]
            },
            {
                name: 'Circulator Pump',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/circulator-pump.svg',
                width: 84,
                height: 34,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 10
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 10
                    }
                ]
            },
            {
                name: 'Variable Speed Pump',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/variable-speed-pump.svg',
                width: 84,
                height: 34,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 10
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 10
                    }
                ]
            },
            {
                name: 'One-Way Valve',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/1-way-valve.svg',
                width: 40,
                height: 20,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 0
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    }
                ]
            },
            {
                name: 'Flow Gauge',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/flow-gauge.svg',
                width: 41,
                height: 16,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: -2
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -2
                    }
                ]
            },
            {
                name: 'Radiator',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/hydronics/radiator.svg',
                width: 72,
                height: 14,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: -4
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -4
                    }
                ]
            },
            {
                name: 'Load Manifold',
                kind: EQUIPMENT_TYPES.ZONE,
                svg: 'assets/images/equipments/hydronics/load-manifold.svg',
                width: 60,
                height: 68,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -3
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 3
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -3
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 3
                    }
                ]
            }
        ]
    },
    {
        name: 'HEATING SOURCE',
        equipment: [
            {
                name: 'Electric On-Demand',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heating-source/electric-on-demand.svg',
                width: 51,
                height: 60,
                holders: [
                    {
                        id: 11,
                        direct: 1,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: -2
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -2
                    }
                ]
            },
            {
                name: 'Gas Boiler',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heating-source/gas-boiler.svg',
                width: 57,
                height: 83,
                holders: [
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 57
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 5
                    }
                ]
            }
        ]
    },
    {
        name: 'COOLING SOURCE',
        equipment: [
            {
                name: 'Hydronic Chiller',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/cooling-source/hydronic-chiller.svg',
                width: 100,
                height: 123,
                holders: [
                    {
                        id: 21,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 38
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    }
                ]
            }
        ]
    },
    {
        name: 'SOLAR THERMAL',
        equipment: [
            {
                name: 'Solar Thermal Panel',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/solar-thermal/solar-thermal-panel.svg',
                width: 71,
                height: 122,
                holders: [
                    {
                        id: 1,
                        direct: 1,
                        method: CONNECTION_METHODS.IN_BOTTOM_TOP,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 51
                    },
                    {
                        id: 3,
                        direct: 3,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 52
                    }
                ]
            }
        ]
    },
    {
        name: 'HEAT PUMP',
        equipment: [
            {
                name: 'Split Air Source Evaporator',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-pump/split-air-source-evaporator.svg',
                width: 61,
                height: 121,
                holders: [
                    {
                        id: 31,
                        direct: 32,
                        method: CONNECTION_METHODS.OUT_TOP_BOTTOM,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 8
                    },
                    {
                        id: 32,
                        direct: 3,
                        method: CONNECTION_METHODS.IN_BOTTOM_TOP,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 5
                    }
                ]
            },
            {
                name: 'Split Air Source Condenser',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-pump/split-air-source-condenser.svg',
                width: 100,
                height: 123,
                holders: [
                    {
                        id: 21,
                        direct: 22,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 38
                    }
                ]
            },
            {
                name: 'Air Source Heat Pump',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-pump/air-source-heat-pump.svg',
                width: 118.5,
                height: 85,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 19
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 18
                    }
                ]
            },
            {
                name: 'Ground Source Heat Pump',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-pump/ground-source-heat-pump.svg',
                width: 100,
                height: 85,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 19
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 18
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 19
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 18
                    }
                ]
            },
            {
                name: 'Ground Loop Exchanger',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-pump/ground-loop-exchanger.svg',
                width: 98,
                height: 130,
                holders: [
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 5
                    },
                    {
                        id: 42,
                        direct: 4,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 36
                    },
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 5
                    },
                    {
                        id: 22,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 36
                    }
                ]
            }
        ]
    },
    {
        name: 'THERMAL STORAGE',
        equipment: [
            {
                name: 'Domestic Hot Water',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/domestic-hot-water.svg',
                width: 92,
                height: 192,
                holders: [
                    {
                        id: 11,
                        direct: 11,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 19
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 17
                    }
                ]
            },
            {
                name: 'Domestic Hot Water',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/domestic-hot-water2.svg',
                width: 100,
                height: 194,
                holders: [
                    {
                        id: 1,
                        direct: 1,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 27
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 17
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 114
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 16
                    }
                ]
            },
            {
                name: 'Stratified Tank',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/stratified-tank.svg',
                width: 106,
                height: 179,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 14
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 45
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 114
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 10
                    }
                ]
            },
            {
                name: 'Upper & Lower HEX Indirect',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/upper-lower-hex-Indirect.svg',
                width: 88,
                height: 184,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 115
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 15
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 26
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 105
                    }
                ]
            },
            {
                name: 'Buffer Tank',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/buffer-tank.svg',
                width: 92,
                height: 181,
                holders: [
                    {
                        id: 21,
                        direct: 21,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 22
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 22
                    },
                    {
                        id: 41,
                        direct: 41,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 22
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 22
                    }
                ]
            },
            {
                name: 'Tank-in-Tank W/ HEX',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/tank-in-tank-w-hex.svg',
                width: 104,
                height: 192,
                holders: [
                    {
                        id: 11,
                        direct: 11,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 27
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 17
                    },
                    {
                        id: 41,
                        direct: 41,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 119
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 10
                    }
                ]
            },
            {
                name: 'Rainwater Storage w/ HEX',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/rainwater-storage-w-hex.svg',
                width: 213,
                height: 192,
                holders: [
                    {
                        id: 11,
                        direct: 1,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 15
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 15
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 93
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 12
                    }
                ]
            },
            {
                name: 'heat-storage-w-hex',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/thermal-storage/heat-storage-w-hex.svg',
                width: 218,
                height: 187,
                holders: [
                     {
                        id: 11,
                        direct: 1,
                        method: CONNECTION_METHODS.IN_TOP_BOTTOM,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 15
                    },
                    {
                        id: 12,
                        direct: 12,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 15 
                    },
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 15
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 92
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 91
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 11
                    }
                ]
            }
        ]
    },
    {
        name: 'HEAT EXCHANGER',
        equipment: [
            {
                name: 'Flat Plate HEX',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-exchanger/flat-plate-hex.svg',
                width: 23,
                height: 48,
                holders: [
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 0
                    },                   
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    },                   
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 0
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    }
                ]
            },
            {
                name: 'Tube-in-Tank HEX',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-exchanger/tube-in-tank-hex.svg',
                width: 83,
                height: 41,
                holders: [
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -7
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: -7
                    }
                ]
            },
            {
                name: 'DHW Recovery',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-exchanger/dhw-recovery.svg',
                width: 30,
                height: 98,
                holders: [
                    {
                        id: 1,
                        direct: 1,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 5
                    },
                    {
                        id: 3,
                        direct: 3,
                        method: CONNECTION_METHODS.IN_BOTTOM_TOP,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 5
                    },
                    {
                        id: 2,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 77
                    },
                    {
                        id: 4,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 3
                    }
                ]
            },
            {
                name: 'Tube-In-Tube HEX',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-exchanger/tube-In-tube-hex.svg',
                width: 20,
                height: 109,
                holders: [
                    {
                        id: 1,
                        direct: 1,
                        method: CONNECTION_METHODS.OUT_BOTTOM_TOP,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 4
                    },
                    {
                        id: 3,
                        direct: 3,
                        method: CONNECTION_METHODS.IN_BOTTOM_TOP,
                        type: CONNECTION_TYPES.INPUT,
                        offset: -4
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 9
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 9
                    }
                ]
            }
        ]
    },
    {
        name: 'HEAT RECOVERY VENTILATOR',
        equipment: [
            {
                name: 'Heat Recovery Ventilator',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/heat-recovery-ventilator/heat-recovery-ventilator.svg',
                width: 82,
                height: 59,
                holders: [
                    {
                        id: 21,
                        direct: 2,
                        method: CONNECTION_METHODS.OUT_LEFT_RIGHT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 0
                    },
                    {
                        id: 22,
                        direct: 22,
                        method: CONNECTION_METHODS.IN_RIGHT_LEFT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    },
                    {
                        id: 41,
                        direct: 4,
                        method: CONNECTION_METHODS.OUT_RIGHT_LEFT,
                        type: CONNECTION_TYPES.OUTPUT,
                        offset: 0
                    },
                    {
                        id: 42,
                        direct: 42,
                        method: CONNECTION_METHODS.IN_LEFT_RIGHT,
                        type: CONNECTION_TYPES.INPUT,
                        offset: 0
                    }
                ]
            }
        ]
    },
    {
        name: 'RENEWABLES',
        equipment: [
            {
                name: 'Photovoltaic Panel',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/photovoltaic-panel.svg',
                width: 66,
                height: 136,
                holders: []
            },
            {
                name: 'Microinverter',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/microinverter.svg',
                width: 74,
                height: 37,
                holders: []
            },
            {
                name: 'PV Inverter',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/battery.svg',
                width: 23,
                height: 38,
                holders: []
            },
            {
                name: 'PV Battery Inverter',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/pv-battery-inverter.svg',
                width: 81,
                height: 97,
                holders: []
            },
            {
                name: 'Breaker Panel',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/breaker-panel.svg',
                width: 65,
                height: 84,
                holders: []
            },
            {
                name: 'Generator',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/generator.svg',
                width: 56,
                height: 42,
                holders: []
            },
            {
                name: 'Battery',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/battery.svg',
                width: 23,
                height: 38,
                holders: []
            },
            {
                name: 'Gorund Bar',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/renewables/gorund-bar.svg',
                width: 86,
                height: 29,
                holders: []
            }
        ]
    },
    {
        name: 'SENSORS',
        equipment: [
            {
                name: 'Temperature',
                kind: EQUIPMENT_TYPES.TANK,
                svg: 'assets/images/equipments/sensors/temperature.svg',
                width: 30,
                height: 20,
                holders: []
            }
        ]
    }
];

/**
 * assets/jsons/site.json
 */
var SENSOR_LIST = [
    {
        name: "SENSORS",
        sensors: [
            {
                id: 1,
                name: "Temperature Sensor",
                url: "assets/images/sensors/t.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 2,
                name: "Thermostat",
                url: "assets/images/sensors/th.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 3,
                name: "Occupancy Sensor",
                url: "assets/images/sensors/ir.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 4,
                name: "Floor Temperature",
                url: "assets/images/sensors/ft.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 5,
                name: "Humidity Sensor",
                url: "assets/images/sensors/h.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.HUMIDITY
            },
            {
                id: 6,
                name: "CO2 Sensor",
                url: "assets/images/sensors/co.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 7,
                name: "VOC Sensor",
                url: "assets/images/sensors/voc.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 8,
                name: "Water Sensor",
                url: "assets/images/sensors/w.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 9,
                name: "Rain Sensor",
                url: "assets/images/sensors/r.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            }
        ]
    },
    {
        name: "USER INPUTS",
        sensors: [
            {
                id: 10,
                name: "Temperature Sensor",
                url: "assets/images/sensors/t.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 11,
                name: "Thermostat",
                url: "assets/images/sensors/th.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 12,
                name: "Occupancy Sensor",
                url: "assets/images/sensors/ir.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 13,
                name: "Floor Temperature",
                url: "assets/images/sensors/ft.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 14,
                name: "Humidity Sensor",
                url: "assets/images/sensors/h.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.HUMIDITY
            },
            {
                id: 15,
                name: "CO2 Sensor",
                url: "assets/images/sensors/co.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 16,
                name: "VOC Sensor",
                url: "assets/images/sensors/voc.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 17,
                name: "Water Sensor",
                url: "assets/images/sensors/w.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 18,
                name: "Rain Sensor",
                url: "assets/images/sensors/r.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            }
        ]
    },
    {
        name: "INDICATORS",
        sensors: [
            {
                id: 19,
                name: "Temperature Sensor",
                url: "assets/images/sensors/t.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 20,
                name: "Thermostat",
                url: "assets/images/sensors/th.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 21,
                name: "Occupancy Sensor",
                url: "assets/images/sensors/ir.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 22,
                name: "Floor Temperature",
                url: "assets/images/sensors/ft.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 23,
                name: "Humidity Sensor",
                url: "assets/images/sensors/h.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.HUMIDITY
            },
            {
                id: 24,
                name: "CO2 Sensor",
                url: "assets/images/sensors/co.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 25,
                name: "VOC Sensor",
                url: "assets/images/sensors/voc.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.THREE_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 26,
                name: "Water Sensor",
                url: "assets/images/sensors/w.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            },
            {
                id: 27,
                name: "Rain Sensor",
                url: "assets/images/sensors/r.svg",
                width: 21,
                height: 21,
                type: SENSOR_TYPES.TWO_WIRE,
                classes: SENSOR_CLASSES.SENSOR,
                kind: SENSOR_KINDS.TEMPERATURE
            }
        ]
    }
];

// wiring
var DEVICE_LIST = {
    1: {
        id: 1,
        name: 'MASTER CONTROLLER',
        adaptors: {
            1: {id: 1, title: 'RELAY ADAPTOR', sensors: []},
            2: {id: 2, title: 'SENSOR ADAPTOR', sensors: []}
        }
    },
    2: {
        id: 2,
        name: 'WIRELESS',
        adaptors: {
            3: {id: 3, title: 'RELAY ADAPTOR', sensors: []},
            4: {id: 4, title: 'SENSOR ADAPTOR', sensors: []}
        }

    }
};

/**
 * assets/jsons/interface.json
 */
// interface
var CONTROL_LIST = [
    {
        name: "CONTROLS",
        items: [
            {
                id: "interface_control_1",
                type: "control",
                name: "Zone Control",
                nameDefault: "Zone",
                url: "assets/images/interfaces/controls/zone.svg",
                w: 47,
                h: 44
            },
            {
                id: "interface_control_2",
                type: "control",
                name: "Floor Level Zone Control",
                url: "assets/images/interfaces/controls/floor.svg",
                w: 47,
                h: 44
            },
            {
                id: "interface_control_3",
                type: "control",
                name: "Building Level Zone Control",
                nameDefault: "Building",
                url: "assets/images/interfaces/controls/all.svg",
                w: 47,
                h: 44
            },
            {
                id: "interface_control_4",
                type: "control",
                name: "Water Control",
                nameDefault: "Water",
                url: "assets/images/interfaces/controls/water.svg",
                w: 47,
                h: 44
            }
        ]
    },
    {
        name: "INDICATORS",
        items: [
            {
                id: "interface_indicator_1",
                type: "indicator",
                name: "TEMPERATURE INDICATOR",
                nameDefault: "TEMPERATURE",
                url: "assets/images/interfaces/indicators/temp-72.svg",
                w: 62,
                h: 33
            },
            {
                id: "interface_indicator_2",
                type: "indicator",
                name: "HUMIDITY INDICATOR",
                nameDefault: "HUMIDITY",
                url: "assets/images/interfaces/indicators/rh-35.svg",
                w: 62,
                h: 33
            },
            {
                id: "interface_indicator_3",
                type: "indicator",
                name: "CO2 INDICATOR",
                nameDefault: "CO2",
                url: "assets/images/interfaces/indicators/co2-800.svg",
                w: 62,
                h: 33
            },
            {
                id: "interface_indicator_4",
                type: "indicator",
                name: "VOC INDICATOR",
                nameDefault: "VOC",
                url: "assets/images/interfaces/indicators/voc-100.svg",
                w: 62,
                h: 33
            },
            {
                id: "interface_indicator_5",
                type: "indicator",
                name: "BAR GRAPH - SMALL",
                nameDefault: "BAR GRAPH",
                url: "assets/images/interfaces/indicators/bar-graph-small.png",
                w: 90,
                h: 15
            },
            {
                id: "interface_indicator_6",
                type: "indicator",
                name: "BAR GRAPH - LARGE",
                nameDefault: "BAR GRAPH",
                url: "assets/images/interfaces/indicators/gauge-large.svg",
                w: 90,
                h: 21
            }
        ]
    },
    {
        name: "USER INPUTS",
        items: [
            {
                id: "interface_user_input_1",
                type: "user_input",
                name: "VENTILATION TOGGLE",
                nameDefault: "Ventilation",
                url: "assets/images/interfaces/userinputs/off/ventilation-normal.png",
                w: 47,
                h: 47
            },
            {
                id: "interface_user_input_2",
                type: "user_input",
                name: "SHADE TOGGLE",
                nameDefault: "Shade",
                url: "assets/images/interfaces/userinputs/off/shade-normal.svg",
                w: 47,
                h: 47
            },
            {
                id: "interface_user_input_3",
                type: "user_input",
                name: "SNOWMELT TOGGLE",
                nameDefault: "Snowmelt",
                url: "assets/images/interfaces/userinputs/off/snowmelt-normal.svg",
                w: 47,
                h: 47
            },
            {
                id: "interface_user_input_4",
                type: "user_input",
                name: "GENERAL TOGGLE",
                nameDefault: "General",
                url: "assets/images/interfaces/userinputs/off/general-normal.svg",
                w: 47,
                h: 47
            }
        ]
    },
    {
        name: "CONTAINERS",
        items: [
            {
                id: "interface_container_1",
                type: "container",
                "containerType": "horizontal",
                name: "HORIZONTAL-CONTAINER",
                url: "assets/images/interfaces/containers/horizontal-container.png",
                w: 140,
                h: 50
            },
            {
                id: "interface_container_2",
                type: "container",
                "containerType": "vertical",
                name: "VERTICAL-CONTAINER",
                url: "assets/images/interfaces/containers/vertical-container.png",
                w: 50,
                h: 140
            }
        ]
    }
];

/**
 * OBJECT FOR ENYO VIEW
 */
// Folder object
var FOLDER = BaseEntity.extend({
    init: function(name) {
        this.id = -1;
        this.name = name || "FOLDER";
        this.projects = new Collection();
    }
});

// Project object;
var PROJECT = BaseEntity.extend({
    init: function(name, image, notes, address, north, west, altitude) {
        this.id = -1;
        this.name = name || "New Project";
        this.image = image || "assets/images/projects/arnott.png";
        this.notes = notes || "Project's Description";
        this.hvacSystem = false;
        this.lighting = false;
        this.irrigation = false;
        this.buildingSiteType = BUILDING_SITE_TYPES.COMMERCIAL;
        this.address = address || '';
        this.north = north || 53.48539;
        this.west = west || -2.248474;
        this.altitude = altitude || 42.588749;
        this.importBuildingModelOption = "";
        this.uValueArea = 0;
        this.uValueType = FLOOR_TYPES.ACCURATE; // accurate or estimate
        this.heatingDesignDay = 0;
        this.coolingDesignDay = 0;
        this.pickerDesignDay = 99.6;
        this.floors = new Collection();
    }
});

// Floor object
var FLOOR = BaseEntity.extend({
    init: function(name, type, value) {
        this.id = -1;
        this.name = name || 'Floor #';
        this.type = type || FLOOR_TYPES.ESTIMATE;
        this.value = value || '';
        this.zones = new Collection();
    }
});

// Zone object
var ZONE = BaseEntity.extend({
    init: function(floorId, name, color) {
        this.id = -1;
        this.floorId = floorId;
        this.name = name || "ENTRY";
        this.color = color || '#FFFFFF';
        this.sensors = new Collection();
    }
});

// Sensor object;
var SENSOR = BaseEntity.extend({
    init: function(sensorId, zoneId, floorId, name, classes, kind, type, currentValue, url) {
        this.id = sensorId || -1;
        this.sensorId = sensorId;
        this.zoneId = zoneId;
        this.floorId = floorId;
        this.name = name || "Temperature Sensor";
        this.class = classes || SENSOR_CLASSES.SENSOR;
        this.kind = kind || SENSOR_KINDS.TEMPERATURE;
        this.type = type || SENSOR_TYPES.TWO_WIRE;
        this.currentValue = currentValue || 66;
        this.url = url || "assets/images/sensors/t.svg";
        this.option = {opt: "10k RTD", coefficientA: "", coefficientB: ""};
        this.items = [];
    }
});

// Equipment Object
var EQUIPMENT = BaseEntity.extend({
    init: function(name, kind, svg, width, height) {
        this.id = -1;
        this.name = name || 'none';
        this.kind = kind || this.name.trim().replace(/ /g, '-');
        this.svg = svg;
        this.width = width;
        this.height = height;
        this.holders = [];
    }
});

/**
 * Objects Temp
 * @type {Collection}
 */
//*** FileViewer
var plFolderList = new Collection();
var plProjectList = new Collection();

var temFolder1 = new FOLDER('UNSORTED SYSTEMS');
var temFolder2 = new FOLDER('USER FOLDER 1');
var temFolder3 = new FOLDER('USER FOLDER 2');
var temProject1 = new PROJECT('Arnott', 'assets/images/projects/arnott.png', '', '', 53.48539, -2.248474, '');
var temProject2 = new PROJECT('Hayes', 'assets/images/projects/hayes.png', '', '', 53.487305, -2.248832, '');
var temProject3 = new PROJECT('Marano', 'assets/images/projects/marano.png', '', '', 53.483079, -2.25426, '');
var temProject4 = new PROJECT('Olympus Cove', 'assets/images/projects/olympus-cove.png', '', '', 53.485913, -2.242308, '');
var temProject5 = new PROJECT('O\'meara', 'assets/images/projects/o-meara.png', '', '', 53.48387, -2.245227, '');
var temProject6 = new PROJECT('Quinn', 'assets/images/projects/quinn.png', '', '', 53.482696, -2.244712, '');
var temProject7 = new PROJECT('Turner', 'assets/images/projects/turner.png', '', '', 53.48539, -2.248474, '');
var temProject8 = new PROJECT('Voz', 'assets/images/projects/voz.png', '', '', 53.48539, -2.248474, '');
var temProject9 = new PROJECT('Zealey', 'assets/images/projects/zealey.png', '', '', 53.48539, -2.248474, '');
plProjectList.add(temProject1, true);
plProjectList.add(temProject2, true);
plProjectList.add(temProject3, true);
plProjectList.add(temProject4, true);
plProjectList.add(temProject5, true);
plProjectList.add(temProject6, true);
plProjectList.add(temProject7, true);
plProjectList.add(temProject8, true);
plProjectList.add(temProject9, true);
temFolder1.projects.add(temProject1);
temFolder1.projects.add(temProject2);
temFolder1.projects.add(temProject3);
temFolder1.projects.add(temProject4);
temFolder1.projects.add(temProject5);
temFolder1.projects.add(temProject6);
temFolder1.projects.add(temProject7);
temFolder1.projects.add(temProject8);
temFolder1.projects.add(temProject9);
plFolderList.add(temFolder1, true);
plFolderList.add(temFolder2, true);
plFolderList.add(temFolder3, true);

//*** Site Builder
var plSensorList = new Collection(); // Sensor store
var plZoneList = new Collection(); // Zone store
var plFloorList = new Collection(); // Floor store
var plProject = new PROJECT();

var temFloor1 = new FLOOR('OUTDOOR', FLOOR_TYPES.ACCURATE, 0);
var temFloor2 = new FLOOR('1ST FLOOR', FLOOR_TYPES.ACCURATE, 0);
var temFloor3 = new FLOOR('2ND FLOOR', FLOOR_TYPES.ESTIMATE, 11);
var temFloor4 = new FLOOR('3RD FLOOR', FLOOR_TYPES.ACCURATE, 1);
plFloorList.add(temFloor1, true);
plFloorList.add(temFloor2, true);
plFloorList.add(temFloor3, true);
plFloorList.add(temFloor4, true);

plProject.floors.add(temFloor1);
plProject.floors.add(temFloor2);
plProject.floors.add(temFloor3);
plProject.floors.add(temFloor4);

//*** Equipment / Component builder
var plComponentList = new Collection();

//*** Setup page and ZoneList runtime
var plProject2 = new PROJECT();

var plFloorList2 = new Collection();

var plZoneList2 = new Collection();

var temFloor21 = new FLOOR('OUTDOOR', FLOOR_TYPES.ACCURATE, '');
var temFloor22 = new FLOOR('Floor #1', FLOOR_TYPES.ACCURATE, '');
var temFloor23 = new FLOOR('Floor #2', FLOOR_TYPES.ACCURATE, '');
plFloorList2.add(temFloor21, true);
plFloorList2.add(temFloor22, true);
plFloorList2.add(temFloor23, true);
plProject2.floors.add(temFloor21);
plProject2.floors.add(temFloor22);
plProject2.floors.add(temFloor23);
// Add zone to temFloor21
var temZone21 = new ZONE(temFloor21.id, 'ENTRY');
var temZone22 = new ZONE(temFloor21.id, 'DINING');
var temZone23 = new ZONE(temFloor21.id, 'SITTING');
var temZone24 = new ZONE(temFloor21.id, 'KITCHEN');
var temZone25 = new ZONE(temFloor21.id, 'LIVING');
var temZone26 = new ZONE(temFloor21.id, 'EXERCISE');
var temZone27 = new ZONE(temFloor21.id, 'ART STUDIO');
var temZone28 = new ZONE(temFloor21.id, 'BATH');
plZoneList2.add(temZone21, true);
plZoneList2.add(temZone22, true);
plZoneList2.add(temZone23, true);
plZoneList2.add(temZone24, true);
plZoneList2.add(temZone25, true);
plZoneList2.add(temZone26, true);
plZoneList2.add(temZone27, true);
plZoneList2.add(temZone28, true);
temFloor21.zones.add(temZone21);
temFloor21.zones.add(temZone22);
temFloor21.zones.add(temZone23);
temFloor21.zones.add(temZone24);
temFloor21.zones.add(temZone25);
temFloor21.zones.add(temZone26);
temFloor21.zones.add(temZone27);
temFloor21.zones.add(temZone28);
// Add zone to temFloor22
var temZone21 = new ZONE(temFloor22.id, 'ENTRY');
var temZone22 = new ZONE(temFloor22.id, 'DINING');
var temZone23 = new ZONE(temFloor22.id, 'SITTING');
var temZone24 = new ZONE(temFloor22.id, 'KITCHEN');
var temZone25 = new ZONE(temFloor22.id, 'LIVING');
var temZone26 = new ZONE(temFloor22.id, 'EXERCISE');
var temZone27 = new ZONE(temFloor22.id, 'ART STUDIO');
var temZone28 = new ZONE(temFloor22.id, 'BATH');
plZoneList2.add(temZone21, true);
plZoneList2.add(temZone22, true);
plZoneList2.add(temZone23, true);
plZoneList2.add(temZone24, true);
plZoneList2.add(temZone25, true);
plZoneList2.add(temZone26, true);
plZoneList2.add(temZone27, true);
plZoneList2.add(temZone28, true);
temFloor22.zones.add(temZone21);
temFloor22.zones.add(temZone22);
temFloor22.zones.add(temZone23);
temFloor22.zones.add(temZone24);
temFloor22.zones.add(temZone25);
temFloor22.zones.add(temZone26);
temFloor22.zones.add(temZone27);
temFloor22.zones.add(temZone28);
// Add zone to temFloor23
var temZone21 = new ZONE(temFloor23.id, 'ENTRY');
var temZone22 = new ZONE(temFloor23.id, 'DINING');
var temZone23 = new ZONE(temFloor23.id, 'SITTING');
var temZone24 = new ZONE(temFloor23.id, 'KITCHEN');
var temZone25 = new ZONE(temFloor23.id, 'LIVING');
var temZone26 = new ZONE(temFloor23.id, 'EXERCISE');
var temZone27 = new ZONE(temFloor23.id, 'ART STUDIO');
var temZone28 = new ZONE(temFloor23.id, 'BATH');
plZoneList2.add(temZone21, true);
plZoneList2.add(temZone22, true);
plZoneList2.add(temZone23, true);
plZoneList2.add(temZone24, true);
plZoneList2.add(temZone25, true);
plZoneList2.add(temZone26, true);
plZoneList2.add(temZone27, true);
plZoneList2.add(temZone28, true);
temFloor23.zones.add(temZone21);
temFloor23.zones.add(temZone22);
temFloor23.zones.add(temZone23);
temFloor23.zones.add(temZone24);
temFloor23.zones.add(temZone25);
temFloor23.zones.add(temZone26);
temFloor23.zones.add(temZone27);
temFloor23.zones.add(temZone28);
