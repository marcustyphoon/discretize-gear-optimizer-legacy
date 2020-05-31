/**
 * --------------------------------------------------------------------------
 * Gear Optimizer
 * --------------------------------------------------------------------------
 */
let Optimizer = function ($) {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const Prefix = Object.freeze({
        GEAR_OPTIMIZER: '#go-',
        CHECKBOX: 'checkbox-',
        INPUT: 'input-',
        SELECT: 'select-'
    });

    const Selector = Object.freeze({
        TOTAL: '#gear-optimizer',

        CHECKBOX: {
            AFFIX: {
                BERSERKER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-berserker',
                ASSASSIN: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-assassin',
                COMMANDER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-commander',
                HARRIER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-harrier',
                DIVINER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-diviner',
                VIPER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-viper',
                GRIEVING: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-grieving',
                SINISTER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'affix-sinister',

            },

            BUFF: {
                MIGHT: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-might',
                FURY: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-fury',
                VULNERABILITY: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'condition-vulnerability',
                BANNER_OF_STRENGTH: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-banner-of-strength',
                BANNER_OF_DISCIPLINE: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-banner-of-discipline',
                EMPOWER_ALLIES: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-empower-allies',
                BANE_SIGNET: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-bane-signet',
                SPOTTER: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-spotter',
                FROST_SPIRIT: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-frost-spirit',
                ASSASSINS_PRESENCE: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'buff-assassins-presence',
            },

            OMNIPOTION: Prefix.GEAR_OPTIMIZER + Prefix.CHECKBOX + 'omnipotion'
        },

        CHECKBOXES: 'input[type="checkbox"]',
        CHECKBOXES_CHECKED: 'input[type="checkbox"]:checked',

        INPUT: {
            OPTIMIZER: Prefix.GEAR_OPTIMIZER + 'input',

            CLASS: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'class',
            TAB_PANE_ACTIVE: '.tab-pane.active',
            AFFIXES: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'affixes',
            BUFFS: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'buffs',

            MIN_BOON_DURATION: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'min-boon-duration',
            MIN_TOUGHNESS: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'min-toughness',
            MIN_HEALING_POWER: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'min-healing-power',
            MAX_TOUGHNESS: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'max-toughness',
            AGONY_RESISTANCE: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'agony-resistance',

            MAX_RESULTS: Prefix.GEAR_OPTIMIZER + Prefix.INPUT + 'max-results'
        },

        SELECT: {
            RANKBY: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'rank-by',
            WEAPON_TYPE: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'weapon-type',
            RUNES: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'runes',
            SIGIL_1: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'sigil-1',
            SIGIL_2: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'sigil-2',
            FOOD: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'food',
            UTILITY: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'utility',
            INFUSIONS: Prefix.GEAR_OPTIMIZER + Prefix.SELECT + 'infusions',
        },

        OUTPUT: {
            LIST: Prefix.GEAR_OPTIMIZER + 'output',
            PROGRESS_BAR: Prefix.GEAR_OPTIMIZER + 'progress-bar',
            HEADER: Prefix.GEAR_OPTIMIZER + 'output-header'
        },

        LABEL: 'label',
        SPAN: 'span',

        DROPDOWN_SELECT: '.dropdown-select',
        DROPDOWN_TOGGLE: '.dropdown-toggle',
        DROPDOWN_MENU: '.dropdown-menu',
        DROPDOWN_ITEM: '.dropdown-item',

        START: 'button' + Prefix.GEAR_OPTIMIZER + 'start',
        STOP: 'button' + Prefix.GEAR_OPTIMIZER + 'stop',
    });

    const ClassName = Object.freeze({
        ACTIVE: 'active',
        DISABLED: 'disabled'
    });

    const PropertyName = Object.freeze({
        CHECKED: 'checked',
        DISABLED: 'disabled'
    });

    const DataAttribute = Object.freeze({
        PRIORITIES: 'go-priorities',
        BUFFS: 'go-buffs',
        MODIFIER: 'go-modifier',
        CLASS: 'go-class',
        PRESELECTION: 'go-preselection'
    });

    let STOP_SIGNAL = false;

    /**
     * ------------------------------------------------------------------------
     * GW2 Data
     * ------------------------------------------------------------------------
     */

    const Attributes = Object.freeze({
        PRIMARY: [
            'Power',
            'Precision',
            'Toughness',
            'Vitality'
        ],

        SECONDARY: [
            'Ferocity',
            'Condition Damage',
            'Expertise',
            'Concentration',
            'Healing Power',
            'Agony Resistance'
        ],

        DERIVED: [
            'Critical Chance',
            'Critical Damage',
            'Condition Duration',
            'Boon Duration',
            'Health',
            'Armor'
        ],

        BOON_DURATION: [
            'Aegis Duration',
            'Fury Duration',
            'Might Duration',
            'Protection Duration',
            'Quickness Duration',
            'Regeneration Duration',
            'Resistance Duration',
            'Retaliation Duration',
            'Stability Duration',
            'Swiftness Duration',
            'Vigor Duration'
        ],

        CONDITION_DURATION: [
            'Bleeding Duration',
            'Blind Duration',
            'Burning Duration',
            'Chilled Duration',
            'Confusion Duration',
            'Crippled Duration',
            'Fear Duration',
            'Immobile Duration',
            'Poison Duration',
            'Slow Duration',
            'Taunt Duration',
            'Torment Duration',
            'Vulnerability Duration',
            'Weakness Duration'
        ],

        EFFECTIVE: [
            'Effective Power',
            'Effective Health',
            'Effective Healing'
        ],

        CONDITION_DAMAGE: [
            'Bleeding Damage',
            'Burning Damage',
            'Confusion Damage',
            'Poison Damage',
            'Torment Damage'
        ],

        INDICATORS: [
            'Damage',
            'Survivability',
            'Healing',
        ]
    });

    const Affix = Object.freeze({
        'Berserker': {
            type: 'triple',
            bonuses: {
                'major': ['Power'],
                'minor': ['Precision', 'Ferocity']
            }
        },
        'Assassin': {
            type: 'triple',
            bonuses: {
                'major': ['Precision'],
                'minor': ['Power', 'Ferocity']
            }
        },
        'Harrier': {
            type: 'triple',
            bonuses: {
                'major': ['Power'],
                'minor': ['Concentration', 'Healing Power']
            }
        },
        'Commander': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Precision'],
                'minor': ['Toughness', 'Concentration']
            }
        },
        'Minstrel': {
            type: 'quadruple',
            bonuses: {
                'major': ['Toughness', 'Healing Power'],
                'minor': ['Vitality', 'Concentration']
            }
        },
        'Magi': {
            type: 'triple',
            bonuses: {
                'major': ['Healing Power'],
                'minor': ['Vitality', 'Precision']
            }
        },
        'Marauder': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Precision'],
                'minor': ['Vitality', 'Ferocity']
            }
        },
        'Cleric': {
            type: 'triple',
            bonuses: {
                'major': ['Healing Power'],
                'minor': ['Power', 'Toughness']
            },
        },
        'Nomad': {
            type: 'triple',
            bonuses: {
                'major': ['Toughness'],
                'minor': ['Vitality', 'Healing Power']
            }
        },
        'Zealot': {
            type: 'triple',
            bonuses: {
                'major': ['Power'],
                'minor': ['Precision', 'Healing Power']
            }
        },
        'Viper': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Condition Damage'],
                'minor': ['Precision', 'Expertise']
            }
        },
        'Sinister': {
            type: 'triple',
            bonuses: {
                'major': ['Condition Damage'],
                'minor': ['Power', 'Precision']
            }
        },
        'Grieving': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Condition Damage'],
                'minor': ['Precision', 'Ferocity']
            }
        },
        'Seraph': {
            type: 'quadruple',
            bonuses: {
                'major': ['Precision', 'Condition Damage'],
                'minor': ['Healing Power', 'Concentration']
            }
        },
        'Marshal': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Healing Power'],
                'minor': ['Precision', 'Condition Damage']
            }
        },
        'Giver': {
            type: 'triple',
            bonuses: {
                'major': ['Toughness'],
                'minor': ['Healing Power', 'Concentration']
            }
        },
        'Knight': {
            type: 'triple',
            bonuses: {
                'major': ['Toughness'],
                'minor': ['Power', 'Precision']
            }
        },
        'Trailblazer': {
            type: 'quadruple',
            bonuses: {
                'major': ['Toughness', 'Condition Damage'],
                'minor': ['Vitality', 'Expertise']
            }
        },
        'Plaguedoctor': {
            type: 'quadruple',
            bonuses: {
                'major': ['Vitality', 'Condition Damage'],
                'minor': ['Healing Power', 'Concentration']
            }
        },
        'Vigilant': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Toughness'],
                'minor': ['Concentration', 'Expertise']
            }
        },
        'Valkyrie': {
            type: 'triple',
            bonuses: {
                'major': ['Power'],
                'minor': ['Vitality', 'Ferocity']
            }
        },
        'Cavalier': {
            type: 'triple',
            bonuses: {
                'major': ['Toughness'],
                'minor': ['Power', 'Ferocity']
            }
        },
        'Berserker+Valkyrie': {
            type: 'bervalk',
            bonuses: {
                'major': ['Power'],
                'minor': ['Vitality', 'Ferocity']
            }
        },
        'Celestial': {
            type: 'celestial',
            bonuses: {
                'major': ['Power'],
                'minor': ['Vitality', 'Ferocity']
            }
        },
        'Diviner': {
            type: 'quadruple',
            bonuses: {
                'major': ['Power', 'Concentration'],
                'minor': ['Precision', 'Ferocity']
            }
        }
    });

    const Item = Object.freeze({
        HELM: {
            'triple': {
                'major': 63,
                'minor': 45
            },
            'quadruple': {
                'major': 54,
                'minor': 30
            }
        },
        SHOULDERS: {
            'triple': {
                'major': 47,
                'minor': 34
            },
            'quadruple': {
                'major': 40,
                'minor': 22
            }
        },
        CHEST: {
            'triple': {
                'major': 141,
                'minor': 101
            },
            'quadruple': {
                'major': 121,
                'minor': 67
            }
        },
        GLOVES: {
            'triple': {
                'major': 47,
                'minor': 34
            },
            'quadruple': {
                'major': 40,
                'minor': 22
            }
        },
        LEGGINGS: {
            'triple': {
                'major': 94,
                'minor': 67
            },
            'quadruple': {
                'major': 81,
                'minor': 44
            }
        },
        BOOTS: {
            'triple': {
                'major': 47,
                'minor': 34
            },
            'quadruple': {
                'major': 40,
                'minor': 22
            }
        },
        AMULET: {
            'triple': {
                'major': 157,
                'minor': 108
            },
            'quadruple': {
                'major': 133,
                'minor': 71
            }
        },
        RING: {
            'triple': {
                'major': 126,
                'minor': 85
            },
            'quadruple': {
                'major': 106,
                'minor': 56
            }
        },
        ACCESSORY: {
            'triple': {
                'major': 110,
                'minor': 74
            },
            'quadruple': {
                'major': 92,
                'minor': 49
            }
        },
        BACK_ITEM: {
            'triple': {
                'major': 63,
                'minor': 40
            },
            'quadruple': {
                'major': 52,
                'minor': 27
            }
        },
        ONEHANDED_WEAPON: {
            'triple': {
                'major': 125,
                'minor': 90
            },
            'quadruple': {
                'major': 108,
                'minor': 59
            }
        },
        TWOHANDED_WEAPON: {
            'triple': {
                'major': 251,
                'minor': 179
            },
            'quadruple': {
                'major': 215,
                'minor': 118
            }
        }
    });

    const Slots = Object.freeze({
        'Dual wield': [
            {
                name: 'Helm',
                short: 'Helm',
                item: Item.HELM
            },
            {
                name: 'Shoulders',
                short: 'Shld',
                item: Item.SHOULDERS
            },
            {
                name: 'Coat',
                short: 'Coat',
                item: Item.CHEST
            },
            {
                name: 'Gloves',
                short: 'Glov',
                item: Item.GLOVES
            },
            {
                name: 'Leggings',
                short: 'Legs',
                item: Item.LEGGINGS
            },
            {
                name: 'Boots',
                short: 'Boot',
                item: Item.BOOTS
            },
            {
                name: 'Amulet',
                short: 'Amul',
                item: Item.AMULET
            },
            {
                name: 'Ring 1',
                short: 'Rng1',
                item: Item.RING
            },
            {
                name: 'Ring 2',
                short: 'Rng2',
                item: Item.RING
            },
            {
                name: 'Accessory 1',
                short: 'Acc1',
                item: Item.ACCESSORY
            },
            {
                name: 'Accessory 2',
                short: 'Acc2',
                item: Item.ACCESSORY
            },
            {
                name: 'Back Item',
                short: 'Back',
                item: Item.BACK_ITEM
            },
            {
                name: 'Mainhand',
                short: 'Wep1',
                item: Item.ONEHANDED_WEAPON
            },
            {
                name: 'Offhand',
                short: 'Wep2',
                item: Item.ONEHANDED_WEAPON
            }
        ],
        'Two-handed': [
            {
                name: 'Helm',
                short: 'Helm',
                item: Item.HELM
            },
            {
                name: 'Shoulders',
                short: 'Shld',
                item: Item.SHOULDERS
            },
            {
                name: 'Coat',
                short: 'Coat',
                item: Item.CHEST
            },
            {
                name: 'Gloves',
                short: 'Glov',
                item: Item.GLOVES
            },
            {
                name: 'Leggings',
                short: 'Legs',
                item: Item.LEGGINGS
            },
            {
                name: 'Boots',
                short: 'Boot',
                item: Item.BOOTS
            },
            {
                name: 'Amulet',
                short: 'Amul',
                item: Item.AMULET
            },
            {
                name: 'Ring 1',
                short: 'Rng1',
                item: Item.RING
            },
            {
                name: 'Ring 2',
                short: 'Rng2',
                item: Item.RING
            },
            {
                name: 'Accessory 1',
                short: 'Acc1',
                item: Item.ACCESSORY
            },
            {
                name: 'Accessory 2',
                short: 'Acc2',
                item: Item.ACCESSORY
            },
            {
                name: 'Back Item',
                short: 'Back',
                item: Item.BACK_ITEM
            },
            {
                name: 'Weapon',
                short: 'Weap',
                item: Item.TWOHANDED_WEAPON
            }
        ]
    });

    const Omnipotion = Object.freeze({
        'multiplier': {
            'Effective Power': 0.15,
            'pre: Condition Damage': 0.15,
            'Effective Health': 0.25
        },
        'convert': {
            'Precision': {
                'Agony Resistance': 1.5
            },
            'Toughness': {
                'Agony Resistance': 1.5
            },
            'Concentration': {
                'Agony Resistance': 1.5
            }
        }
    });

    const Health = Object.freeze({
        LOW: 1645,
        MEDIUM: 5922,
        HIGH: 9212
    });

    const Defense = Object.freeze({
        LIGHT: 967,
        MEDIUM: 1118,
        HEAVY: 1271
    });

    const Classes = Object.freeze({
        'warrior': {health: Health.HIGH, defense: Defense.HEAVY},
        'necromancer': {health: Health.HIGH, defense: Defense.LIGHT},
        'revenant': {health: Health.MEDIUM, defense: Defense.HEAVY},
        'engineer': {health: Health.MEDIUM, defense: Defense.MEDIUM},
        'ranger': {health: Health.MEDIUM, defense: Defense.MEDIUM},
        'mesmer': {health: Health.MEDIUM, defense: Defense.LIGHT},
        'guardian': {health: Health.LOW, defense: Defense.HEAVY},
        'thief': {health: Health.LOW, defense: Defense.MEDIUM},
        'elementalist': {health: Health.LOW, defense: Defense.LIGHT},
    });

    const Condition = Object.freeze({
        'Burning': {
            baseDamage: 131,
            factor: 0.155
        },
        'Bleeding': {
            baseDamage: 22,
            factor: 0.06
        },
        'Poison': {
            baseDamage: 33.5,
            factor: 0.06
        },
        'Torment': {
            baseDamage: 22,
            factor: 0.06
        },
        'Confusion': {
            baseDamage: 22,
            factor: 0.06
        }
    });

    const INFUSION_AMOUNT = 18;
    const INFUSION_BONUS = 5;
    const INFUSION_TOTAL = INFUSION_AMOUNT * INFUSION_BONUS;

    /**
     * ------------------------------------------------------------------------
     * Optimizer definition
     * ------------------------------------------------------------------------
     */

    let Optimizer = function () {
        function Optimizer() {
            let _optimizer = this;

            _optimizer.startTime = new Date();

            let _modifiers = [];
            let _tags = [];

            // Checkbox modifiers
            $.each($([Selector.INPUT.CLASS + ' ' + Selector.INPUT.TAB_PANE_ACTIVE,
                Selector.INPUT.BUFFS].join(',')).find(Selector.CHECKBOXES_CHECKED + '[data-'
                + DataAttribute.MODIFIER + ']'), function () {
                _modifiers.push($(this).data(DataAttribute.MODIFIER));
                let span = $(this).siblings(Selector.LABEL).children(Selector.SPAN);
                if (span.is('[data-armory-ids]')) {
                    let type = span.children('div').attr('class').split(' ')[1];
                    _tags.push('<div data-armory-size="40" data-armory-embed="' + type.substring(
                        5, type.length - 6) + '" data-armory-ids="' + span.data('armory-ids') + '"></div>');
                } else if (span.hasClass('icon')) {
                    _tags.push('<div class="icon icon-lg ' + span.attr('class').split(' ')[1] + '"></div>');
                }
            });

            // Select modifiers
            $.each($([Selector.SELECT.RUNES, Selector.SELECT.SIGIL_1, Selector.SELECT.SIGIL_2,
                Selector.SELECT.FOOD, Selector.SELECT.UTILITY].join(','))
                .children(Selector.DROPDOWN_MENU).children(Selector.DROPDOWN_ITEM + '.' + ClassName.ACTIVE
                    + '[data-' + DataAttribute.MODIFIER + ']'), function () {
                _modifiers.push($(this).data(DataAttribute.MODIFIER));
                _tags.push('<div data-armory-size="40" data-armory-embed="items" data-armory-ids="' + $(
                    this).children(Selector.SPAN).data('armory-ids') + '"></div>');
            });

            // Omnipotion
            if ($(Selector.CHECKBOX.OMNIPOTION).prop(PropertyName.CHECKED)) {
                _modifiers.push(Omnipotion);
                _tags.push(
                    '<div data-armory-size="40" data-armory-embed="items" data-armory-ids="79722"></div>');
            }

            _modifiers.push(
                {'flat': {'Agony Resistance': parseInt($(Selector.INPUT.AGONY_RESISTANCE).val())}});

            _optimizer.baseCharacter = new Character(
                $(Selector.TOTAL).find('a.nav-link[data-' + DataAttribute.CLASS + '].'
                    + ClassName.ACTIVE).data(DataAttribute.CLASS),
                $(Selector.SELECT.WEAPON_TYPE).children(
                    Selector.DROPDOWN_MENU).children(Selector.DROPDOWN_ITEM + '.'
                    + ClassName.ACTIVE).text().trim(),
                _modifiers,
                _tags);

            _optimizer.affixes = $(Selector.INPUT.AFFIXES).find(Selector.CHECKBOXES_CHECKED).map(
                function () {
                    return $(this).siblings(Selector.LABEL).text().trim()
                }).get();

            _optimizer.rankby = $(Selector.SELECT.RANKBY).children(
                Selector.DROPDOWN_MENU).children(Selector.DROPDOWN_ITEM + '.'
                + ClassName.ACTIVE).text().trim();

            _optimizer.minBoonDuration = parseFloat($(Selector.INPUT.MIN_BOON_DURATION).val());
            _optimizer.minHealingPower = parseInt($(Selector.INPUT.MIN_HEALING_POWER).val());
            _optimizer.minToughness = parseInt($(Selector.INPUT.MIN_TOUGHNESS).val());
            _optimizer.maxToughness = parseInt($(Selector.INPUT.MAX_TOUGHNESS).val());
            _optimizer.maxResults = parseInt($(Selector.INPUT.MAX_RESULTS).val());

            _optimizer.statInfusions = $(Selector.SELECT.INFUSIONS).children(
                Selector.DROPDOWN_MENU).children(Selector.DROPDOWN_ITEM + '.'
                + ClassName.ACTIVE).text().trim();
            if (_optimizer.statInfusions !== 'None') {
                _optimizer.primaryInfusion = _optimizer.statInfusions.split('+')[0].trim();
                _optimizer.secondaryInfusion = _optimizer.statInfusions.indexOf('+') !== -1
                    ? _optimizer.statInfusions.split('+')[1].trim() : null;
            }

            _optimizer.baseCharacter.distribution = {};
            $.each($('#go-condition-distribution-input').find('input[data-go-distribution]'), function () {
                let percentage = parseInt($(this).val());
                if (percentage) {
                    _optimizer.baseCharacter.distribution[$(this).data('go-distribution')] = percentage;
                }
            });
        }

        Optimizer.prototype.calculate = function () {
            let _optimizer = this;

            let freeSlots = _optimizer.baseCharacter.weapontype === 'Dual wield' ? 5 : 6;
            let pairs = _optimizer.baseCharacter.weapontype === 'Dual wield' ? 3 : 2;
            let triplets = 1;
            _optimizer.calculationTotal = Math.pow(_optimizer.affixes.length, freeSlots)
                * Math.pow(_optimizer.affixes.length + _optimizer._choose(_optimizer.affixes.length, 2),
                    pairs)
                * (_optimizer.affixes.length + _optimizer.affixes.length * (_optimizer.affixes.length
                    - triplets) + _optimizer._choose(_optimizer.affixes.length, 3));

            STOP_SIGNAL = false;
            _optimizer.calculationRuns = 0;
            _optimizer.list = $(Selector.OUTPUT.LIST);
            _optimizer.list.empty();

            $(Selector.OUTPUT.PROGRESS_BAR).closest('td').attr(
                'colspan', Slots[_optimizer.baseCharacter.weapontype].length + 1);
            $(Selector.OUTPUT.PROGRESS_BAR).css('width', 0 + '%').children(Selector.SPAN).text('0%');
            $(Selector.OUTPUT.PROGRESS_BAR).parent().show();

            $(Selector.OUTPUT.HEADER).html('<th>' + _optimizer.rankby + '</th>' + $.map(
                Slots[_optimizer.baseCharacter.weapontype], function (index) {
                    return '<th title="' + index.name + '">' + index.short + '</th>';
                }).join(''));

            _optimizer._lock(true);

            _optimizer.calculationQueue = [];
            _optimizer.calculationQueue.push([]);

            setTimeout(_optimizer._advanceCalculation.bind(_optimizer), 0);
        };

        Optimizer.prototype._lock = function (lock) {
            $('body').css('cursor', (lock ? 'progress' : 'default'));
            $(Selector.INPUT.OPTIMIZER).css('opacity', lock ? 0.5 : 1);
            $(Selector.INPUT.CLASS).css('opacity', lock ? 0.5 : 1);
            $(Selector.START).prop(PropertyName.DISABLED, lock);
            $(Selector.START).find('.fa').toggleClass('fa-spin', lock);
            $(Selector.STOP).prop(PropertyName.DISABLED, !lock);

            if (!lock) {
                if (STOP_SIGNAL) {
                    $(Selector.OUTPUT.PROGRESS_BAR).children('span').text('Cancelled after ' + (new Date()
                        - this.startTime) + 'ms (' + $(Selector.OUTPUT.PROGRESS_BAR).children('span').text()
                        + ')');
                } else {
                    $(Selector.OUTPUT.PROGRESS_BAR).children('span').text('Completed in ' + (new Date()
                        - this.startTime) + 'ms');
                }
            }
        };

        Optimizer.prototype._advanceCalculation = function () {
            let _optimizer = this;

            try {
                let cycles = 1000;
                while (_optimizer.calculationQueue.length && cycles--) {
                    if (STOP_SIGNAL) {
                        throw 0;
                    }

                    let gear = _optimizer.calculationQueue.pop();
                    let nextSlot = gear.length;

                    if (
                        // Rings/Accs/Weapons
                        ((nextSlot === 9 || nextSlot === 11 || nextSlot === 14) && gear[nextSlot - 2]
                            > gear[nextSlot - 1]) ||
                        // Shoulders/Gloves/Boots
                        (nextSlot === 6 && (gear[1] > gear[3] || gear[3] > gear[5]))) {
                        continue;
                    }

                    if (nextSlot >= Slots[_optimizer.baseCharacter.weapontype].length) {
                        _optimizer._insertCharacter(
                            $.extend(true, {}, _optimizer.baseCharacter).applyGear(gear));
                        continue;
                    }

                    // Recycle for Affix 0, clone for 1+
                    for (let i = 1; i < _optimizer.affixes.length; i++) {
                        let newGear = gear.slice();
                        newGear[nextSlot] = _optimizer.affixes[i];
                        _optimizer.calculationQueue.push(newGear);
                    }
                    gear[nextSlot] = _optimizer.affixes[0];
                    _optimizer.calculationQueue.push(gear);
                }

                if (_optimizer.calculationQueue.length) {
                    setTimeout(_optimizer._advanceCalculation.bind(_optimizer), 0);
                } else {
                    _optimizer._lock(false);
                }
            } catch (e) {
                _optimizer._lock(false);
                if (e !== 0) {
                    throw e;
                }
            }
        };

        Optimizer.prototype._insertCharacter = function (character) {
            let _optimizer = this;

            let percent = Math.floor(++_optimizer.calculationRuns * 100 / _optimizer.calculationTotal);
            $(Selector.OUTPUT.PROGRESS_BAR).css('width', percent + '%').find(Selector.SPAN).text(percent
                + '%');

            character.updateAttributes();

            if (_optimizer.primaryInfusion &&
                (!_optimizer.worstScore || !_optimizer.secondaryInfusion || $.extend(true, {},
                    character).addModifiers({
                    'flat': {
                        [_optimizer.primaryInfusion]: INFUSION_TOTAL,
                        [_optimizer.secondaryInfusion]: INFUSION_TOTAL
                    }
                }).updateAttributes().attributes[_optimizer.rankby] > _optimizer.worstScore)) {
                character = _optimizer._applyInfusions(character);
            }

            if ((_optimizer.minBoonDuration > 0 && (!character.attributes['Boon Duration']
                || character.attributes['Boon Duration'] < _optimizer.minBoonDuration))
                || (_optimizer.minToughness > 0 && (!character.attributes['Toughness']
                    || character.attributes['Toughness'] < _optimizer.minToughness))
                || (_optimizer.minHealingPower > 0 && (!character.attributes['Healing Power']
                    || character.attributes['Healing Power'] < _optimizer.minHealingPower))
                || (character.attributes['Toughness'] && character.attributes['Toughness']
                    > _optimizer.maxToughness)
                || (_optimizer.worstScore && _optimizer.worstScore
                    > character.attributes[_optimizer.rankby])) {
                return;
            }

            if (_optimizer.list.children().length === 0) {
                _optimizer.list.append(_optimizer._characterToRow(character));
            } else {
                let position = _optimizer.list.children().length + 1;
                while (position > 1 && _optimizer._characterLT(
                    _optimizer.list.children().eq(position - 2).data('character'), character)) {
                    position--;
                }

                if (position > _optimizer.maxResults) {
                    return;
                }

                if (position <= _optimizer.list.children().length) {
                    _optimizer._characterToRow(character).insertBefore(
                        _optimizer.list.children().eq(position - 1));

                    if (_optimizer.list.children().length > _optimizer.maxResults) {
                        _optimizer.list.children().last().remove();
                    }
                } else {
                    _optimizer.list.append(_optimizer._characterToRow(character));
                }

                if (_optimizer.list.children().length === _optimizer.maxResults) {
                    _optimizer.worstScore = _optimizer.list.children().last().data(
                        'character').attributes[_optimizer.rankby];
                }
            }
        };

        Optimizer.prototype._applyInfusions = function (character) {
            let _optimizer = this;

            if (!_optimizer.secondaryInfusion) {
                let best = $.extend(true, {}, character);
                best.addModifiers(
                    {'flat': {[_optimizer.primaryInfusion]: INFUSION_TOTAL}}).updateAttributes();
                best.infusions = {[_optimizer.primaryInfusion]: INFUSION_AMOUNT};
                return best;
            } else {
                let best = $.extend(true, {}, character);
                let base = $.extend(true, {}, character);
                for (let primaryBonus = INFUSION_TOTAL; primaryBonus >= 0; primaryBonus -= INFUSION_BONUS) {
                    let temp = $.extend(true, {}, base).addModifiers({
                        'flat': {
                            [_optimizer.primaryInfusion]: primaryBonus,
                            [_optimizer.secondaryInfusion]: INFUSION_TOTAL - primaryBonus
                        }
                    }).updateAttributes();
                    temp.infusions = {
                        [_optimizer.primaryInfusion]: primaryBonus / INFUSION_BONUS,
                        [_optimizer.secondaryInfusion]: (INFUSION_TOTAL - primaryBonus) / INFUSION_BONUS
                    };
                    if (_optimizer._characterLT(best, temp)) {
                        best = temp;
                    }
                }
                return best;
            }
        };

        Optimizer.prototype._characterToRow = function (character) {
            let _optimizer = this;

            return $('<tr><td><strong>' + Number(
                character.attributes[_optimizer.rankby].toFixed(2)).toLocaleString('en-US')
                + '</strong></td>'
                + $.map(character.gear, function (value) {
                    return '<td><samp>' + value.substring(0, 4) + '</samp></td>';
                }).join('')
                + '</tr>')
                .data('character', $.extend(true, {}, character));
        };

        Optimizer.prototype._characterLT = function (a, b) {
            let _optimizer = this;

            if (_optimizer.minBoonDuration > 0) {
                if ((!a.attributes['Boon Duration'] || a.attributes['Boon Duration']
                    < _optimizer.minBoonDuration)
                    && b.attributes['Boon Duration'] && b.attributes['Boon Duration']
                    >= _optimizer.minBoonDuration) {
                    return true;
                } else if ((!b.attributes['Boon Duration'] || a.attributes['Boon Duration']
                    < _optimizer.minBoonDuration)
                    && a.attributes['Boon Duration'] && a.attributes['Boon Duration']
                    >= _optimizer.minBoonDuration) {
                    return false;
                }
            }

            if (_optimizer.minHealingPower > 0) {
                if ((!a.attributes['Healing Power'] || a.attributes['Healing Power']
                    < _optimizer.minHealingPower)
                    && b.attributes['Healing Power'] && b.attributes['Healing Power']
                    >= _optimizer.minHealingPower) {
                    return true;
                } else if ((!b.attributes['Healing Power'] || a.attributes['Healing Power']
                    < _optimizer.minHealingPower)
                    && a.attributes['Healing Power'] && a.attributes['Healing Power']
                    >= _optimizer.minHealingPower) {
                    return false;
                }
            }

            if (_optimizer.minToughness > 0) {
                if ((!a.attributes['Toughness'] || a.attributes['Toughness'] < _optimizer.minToughness)
                    && b.attributes['Toughness'] && b.attributes['Toughness'] >= _optimizer.minToughness) {
                    return true;
                } else if ((!b.attributes['Toughness'] || a.attributes['Toughness']
                    < _optimizer.minBoonDuration)
                    && a.attributes['Toughness'] && a.attributes['Toughness'] >= _optimizer.minToughness) {
                    return false;
                }
            }

            if (_optimizer.maxToughness) {
                if (a.attributes['Toughness'] && a.attributes['Toughness'] > _optimizer.maxToughness
                    && (!b.attributes['Toughness'] || b.attributes['Toughness']
                        <= _optimizer.maxToughness)) {
                    return false;
                } else if (b.attributes['Toughness'] && b.attributes['Toughness'] > _optimizer.maxToughness
                    && (!a.attributes['Toughness'] || a.attributes['Toughness']
                        <= _optimizer.maxToughness)) {
                    return true;
                }
            }

            if (a.attributes[_optimizer.rankby] === b.attributes[_optimizer.rankby]) {
                let sumA = 0;
                let sumB = 0;
                for (let attribute of Attributes.PRIMARY.concat(Attributes.SECONDARY)) {
                    sumA += a.attributes.hasOwnProperty(attribute) ? a.attributes[attribute] : 0;
                    sumB += b.attributes.hasOwnProperty(attribute) ? b.attributes[attribute] : 0;
                }

                return sumA < sumB;
            }

            return a.attributes[_optimizer.rankby] < b.attributes[_optimizer.rankby];
        };

        Optimizer.prototype._choose = function (n, k) {
            let num = 1;
            let denom = 1;

            for (let i = 0; i < k; i++) {
                num *= (n - i);
                denom *= (i + 1);
            }

            return num / denom;
        };

        return Optimizer;
    }();

    /**
     * ------------------------------------------------------------------------
     * Character definition
     * ------------------------------------------------------------------------
     */

    let Character = function () {
        function Character(profession, weapontype, modifiers, tags) {
            let _character = this;

            _character.profession = profession;
            _character.addModifiers({'flat': {'Health': Classes[_character.profession].health}});
            _character.addModifiers({'flat': {'Armor': Classes[_character.profession].defense}});

            _character.weapontype = weapontype;

            $.each(Attributes.PRIMARY, function (index, attribute) {
                _character.addModifiers({'flat': {[attribute]: 1000}});
            });
            _character.addModifiers({'flat': {'Critical Damage': 150}});

            $.each(modifiers, function (index, modifier) {
                _character.addModifiers(modifier);
            });

            _character.tags = tags;
        }

        Character.prototype.applyGear = function (gear) {
            if (!gear) {
                return;
            }

            let _character = this;
            _character.gear = gear;

            $.each(_character.gear, function (index, affix) {
                $.each(Slots[_character.weapontype][index].item[Affix[affix].type], function (type, bonus) {
                    $.each(Affix[affix].bonuses[type], function (index, stat) {
                        _character.addModifiers({'flat': {[stat]: bonus}});
                    });
                });
            });

            return this;
        };

        Character.prototype.addModifiers = function (modifiers) {
            if (!modifiers) {
                return;
            }

            let _character = this;

            if (!_character.modifiers) {
                _character.modifiers = {};
            }

            $.each(modifiers, function (type, modifier) {
                if (type && modifier !== undefined) {
                    if (!_character.modifiers[type]) {
                        _character.modifiers[type] = {};
                    }

                    if (!type) {
                    } else if (type === 'bountiful-maintenance-oil') {
                        _character.modifiers[type] = modifier;
                    } else {
                        $.each(modifier, function (attribute, value) {
                            if (attribute && value) {
                                switch (type) {
                                    case 'multiplier':
                                        if (attribute !== 'Condition Damage' && attribute !== 'Critical Damage'
                                            && !Attributes.EFFECTIVE.includes(attribute)
                                            && !Attributes.CONDITION_DAMAGE.includes(attribute) && attribute
                                            !== 'add: Condition Damage' && attribute !== 'pre: Condition Damage' &&
                                            attribute !== 'add: Effective Power') {
                                            throw 'Multipliers can only modify primary, secondary or effective attributes, not '
                                            + attribute;
                                        }
                                        if (!_character.modifiers[type][attribute]) {
                                            _character.modifiers[type][attribute] = [];
                                        }

                                        _character.modifiers[type][attribute].push(value);
                                        break;
                                    case 'flat':
                                    case 'buff':
                                        if (!Attributes.PRIMARY.includes(attribute) && !Attributes.SECONDARY.includes(
                                            attribute)
                                            && !Attributes.DERIVED.includes(attribute)
                                            && !Attributes.BOON_DURATION.includes(attribute)
                                            && !Attributes.CONDITION_DURATION.includes(attribute)) {
                                            throw 'Flat or buff modifiers can only increase primary, secondary or derived attributes, not '
                                            + attribute;
                                        }

                                        _character.modifiers[type][attribute] = _character.modifiers[type][attribute]
                                        > 0 ? _character.modifiers[type][attribute] + value : value;
                                        break;
                                    case 'convert':
                                        if (!Attributes.PRIMARY.includes(attribute) && !Attributes.SECONDARY.includes(
                                            (attribute))) {
                                            throw 'Conversions can only modify primary or secondary attributes, not '
                                            + attribute;
                                        }

                                        if (!_character.modifiers[type][attribute]) {
                                            _character.modifiers[type][attribute] = {};
                                        }

                                        $.each(value, function (source, conversion) {
                                            _character.modifiers[type][attribute][source] =
                                                _character.modifiers[type][attribute][source] > 0
                                                    ? _character.modifiers[type][attribute][source] + conversion
                                                    : conversion;
                                        });
                                        break;
                                }
                            }
                        });
                    }
                }
            });

            return this;
        };

        Character.prototype.updateAttributes = function () {
            let _character = this;

            _character.attributes = {};

            $.each(_character.modifiers['flat'], function (attribute, bonus) {
                _character.attributes[attribute] = _character.attributes[attribute] > 0
                    ? _character.attributes[attribute] + bonus : bonus;
            });

            // This is basically only Omnipotion
            // https://discordapp.com/channels/301270513093967872/370538919118503947/716156322348793877
            if (_character.attributes['Condition Damage'] && _character.modifiers['multiplier']
                && _character.modifiers['multiplier']['pre: Condition Damage']) {
                // Applies multiplicative
                for (let multiplier of _character.modifiers['multiplier']['pre: Condition Damage']) {
                    _character.attributes['Condition Damage'] = Math.round(_character.attributes['Condition Damage']
                        * (1.0 + multiplier));
                }
            }

            $.each(_character.modifiers['convert'], function (attribute, conversion) {
                $.each(conversion, function (source, percent) {
                    let bonus = _character.modifiers['flat'][source] > 0
                        ? Math.round(_character.modifiers['flat'][source] * percent) : 0;
                    if (bonus) {
                        _character.attributes[attribute] = _character.attributes[attribute] > 0
                            ? _character.attributes[attribute] + bonus : bonus;
                    }
                });
            });

            $.each(_character.modifiers['buff'], function (attribute, bonus) {
                _character.attributes[attribute] = _character.attributes[attribute] > 0
                    ? _character.attributes[attribute] + bonus : bonus;
            });

            // Derive attributes
            let conditionDurationBonus = _character.attributes['Expertise'] > 0
                ? _character.attributes['Expertise'] / 15 : 0;
            if (conditionDurationBonus) {
                _character.attributes['Condition Duration'] = Math.min(
                    _character.attributes['Condition Duration'] > 0
                        ? _character.attributes['Condition Duration'] + conditionDurationBonus
                        : conditionDurationBonus, 100.0);
            }
            if (_character.attributes['Condition Duration']) {
                $.each(Attributes.CONDITION_DURATION, function (index, stat) {
                    _character.attributes[stat] = _character.attributes[stat] > 0
                        ? Math.min(_character.attributes[stat] + _character.attributes['Condition Duration'],
                            100.0) : _character.attributes['Condition Duration'];
                });
            }

            let boonDurationBonus = _character.attributes['Concentration'] > 0
                ? _character.attributes['Concentration'] / 15 : 0;
            if (boonDurationBonus) {
                _character.attributes['Boon Duration'] = Math.min(
                    _character.attributes['Boon Duration'] > 0 ? _character.attributes['Boon Duration']
                        + boonDurationBonus : boonDurationBonus, 100.0);
            }
            if (_character.attributes['Boon Duration']) {
                $.each(Attributes.BOON_DURATION, function (index, stat) {
                    _character.attributes[stat] = _character.attributes[stat] > 0
                        ? Math.min(_character.attributes[stat] + _character.attributes['Boon Duration'],
                            100.0) : _character.attributes['Boon Duration'];
                });
            }

            let criticalChanceBonus = _character.attributes['Precision'] > 0
                ? (_character.attributes['Precision'] - 895) / 21 : 0;
            if (criticalChanceBonus) {
                _character.attributes['Critical Chance'] = Math.min(
                    _character.attributes['Critical Chance'] > 0 ? _character.attributes['Critical Chance']
                        + criticalChanceBonus : criticalChanceBonus, 100.0);
            }

            let criticalDamageBonus = _character.attributes['Ferocity'] > 0
                ? _character.attributes['Ferocity'] / 15 : 0;
            if (criticalDamageBonus) {
                _character.attributes['Critical Damage'] = _character.attributes['Critical Damage'] > 0
                    ? _character.attributes['Critical Damage'] + criticalDamageBonus : criticalDamageBonus;
            }

            if (_character.attributes['Vitality']) {
                _character.attributes['Health'] = _character.attributes['Health'] > 0
                    ? _character.attributes['Health'] + _character.attributes['Vitality'] * 10
                    : _character.attributes['Vitality'] * 10;
            }

            if (_character.attributes['Toughness']) {
                _character.attributes['Armor'] = _character.attributes['Armor'] > 0
                    ? _character.attributes['Armor'] + _character.attributes['Toughness']
                    : _character.attributes['Toughness'];
            }

            let critDmg = _character.attributes['Critical Damage'];
            if (critDmg && _character.modifiers['multiplier']
                && _character.modifiers['multiplier']['Critical Damage']) {
                // Applies multiplicative
                for (let multiplier of _character.modifiers['multiplier']['Critical Damage']) {
                    critDmg = critDmg * (1.0 + multiplier);
                }
            }

            // Effective attributes
            _character.attributes['Effective Power'] = _character.attributes['Power']
                + _character.attributes['Power'] * (_character.attributes['Critical Chance'] / 100)
                * ((critDmg - 100) / 100);
            _character.attributes['Effective Health'] = _character.attributes['Health']
                * _character.attributes['Armor'];
            _character.attributes['Effective Healing'] = _character.attributes['Healing Power'] > 0
                ? _character.attributes['Healing Power'] : 0;

            let _multipliers = $.extend({}, _character.modifiers['multiplier']);
            if (_character.modifiers.hasOwnProperty('bountiful-maintenance-oil')) {
                let bonus = (_character.attributes['Healing Power'] > 0
                    ? _character.attributes['Healing Power'] * 0.6 / 10000 : 0)
                    + (_character.attributes['Concentration'] > 0 ? _character.attributes['Concentration']
                        * 0.8 / 10000 : 0);
                if (bonus) {
                    if (!_multipliers['Effective Healing']) {
                        _multipliers['Effective Healing'] = [];
                    }

                    _multipliers['Effective Healing'].push(bonus);
                }
            }

            let additivePowerModis = 1.0;
            $.each(_multipliers, function (attribute, multipliers) {
                if (Attributes.EFFECTIVE.includes(attribute) && _character.attributes[attribute]) {
                    for (let multiplier of multipliers) {
                        _character.attributes[attribute] *= 1.0 + multiplier;
                    }
                } else {
                    if(attribute === 'add: Effective Power') {
                        for (let multiplier of multipliers){
                            additivePowerModis += multiplier;
                        }
                    }
                }
            });
            _character.attributes['Effective Power'] *= additivePowerModis;

            // Conditions
            $.each(Condition, function (condition, data) {
                _character.attributes[condition + ' Damage'] = (_character.attributes['Condition Damage']
                > 0 ? data.factor * _character.attributes['Condition Damage'] : 0) + data.baseDamage;
            });

            if (_character.attributes['Condition Damage'] && _multipliers &&
                (_multipliers['Condition Damage'] || _multipliers['add: Condition Damage'])) {

                if(_multipliers['add: Condition Damage']) {
                    // Sums up all additive condition damage modifiers
                    let additiveCondiDmg = 1.0;
                    for (let multiplier of _multipliers['add: Condition Damage']) {
                        additiveCondiDmg += multiplier;
                    }
                    // multiply the sum of all additive modifiers on the characters condition ticks
                    for (let conditionDamage of Attributes.CONDITION_DAMAGE) {
                        _character.attributes[conditionDamage] *= additiveCondiDmg;
                    }
                }

                if (_multipliers['Condition Damage']) {
                    for (let multiplier of _multipliers['Condition Damage']) {
                        for (let conditionDamage of Attributes.CONDITION_DAMAGE) {
                            _character.attributes[conditionDamage] *= 1.0 + multiplier;
                        }
                    }
                }
            }
            $.each(_multipliers, function (attribute, multipliers) {
                if (Attributes.CONDITION_DAMAGE.includes(attribute) && _character.attributes[attribute]) {
                    for (let multiplier of multipliers) {
                        _character.attributes[attribute] *= 1.0 + multiplier;
                    }
                }
            });

            // Calculate scores
            _character.attributes['Damage'] = 0;
            $.each(_character.distribution, function (key, percentage) {
                let score;
                switch (key) {
                    case "Power":
                        score = _character.attributes['Effective Power'] / 1025;
                        break;
                    case "Burning":
                    case "Bleeding":
                    case "Poison":
                    case "Torment":
                    case "Confusion":
                        score = (_character.attributes[key + ' Damage'] / Condition[key].baseDamage) * (1
                            + (_character.attributes[key + ' Duration'] > 0 ? _character.attributes[key
                            + ' Duration'] / 100 : 0));
                        break;
                }

                _character.attributes['Damage'] += score * percentage;
            });

            _character.attributes['Survivability'] = _character.attributes['Effective Health'] / 1967;
            _character.attributes['Healing'] = _character.attributes['Effective Healing'];

            return this;
        };

        Character.prototype.toModal = function () {
            let _character = this;

            console.debug(_character);

            let modal = '<div class="modal">';
            modal += '<div class="modal-dialog modal-lg">';
            modal += '<div class="modal-content">';

            // Header
            modal += '<div class="modal-header">';
            modal += '<h5 class="modal-title">Character Overview</h5>';
            modal += '<button type="button" class="close" data-dismiss="modal"><span class="fa fa-times"></span></button>';
            modal += '</div>';

            // Body
            modal += '<div class="modal-body">';
            modal += '<div class="container-fluid">';
            modal += '<div class="row">';

            // Tags
            modal += '<div class="col-12 text-center"><div class="card card-' + _character.profession
                + ' mb-3"><div class="card-header card-header-small">Modifiers</div><div' +
                ' class="card-body character-tags">' + _character.tags.join('') + '</div></div></div>';

            // First column
            modal += '<div class="col-12 col-lg-6">';

            let indicators = {};
            $.each(Attributes.INDICATORS, function (index, attribute) {
                indicators[attribute] = Number(_character.attributes[attribute].toFixed(4)).toLocaleString(
                    'en-US');
            });
            modal += _character._toCard('Indicators', indicators);

            let gear = {};
            $.each(_character.gear, function (index, value) {
                gear[Slots[_character.weapontype][index].name] = value;
            });
            modal += _character._toCard('Gear', gear);

            modal += _character._toCard('Stat Infusions', _character.infusions);

            let effectiveValues = {};
            $.each(["Power", "Precision", "Ferocity", "Condition Damage", "Expertise"],
                function (index, value) {
                    if (_character.attributes[value]) {
                        let temp = $.extend(true, {}, _character).addModifiers({
                            'flat': {
                                [value]: 5
                            }
                        }).updateAttributes();
                        effectiveValues[value] = Number(
                            (temp.attributes['Damage'] - _character.attributes['Damage']).toFixed(
                                5)).toLocaleString('en-US');
                    }
                });
            modal += _character._toCard('Damage increase from +5 of attribute', effectiveValues);

            let effectiveNegativeValues = {};
            $.each(["Power", "Precision", "Ferocity", "Condition Damage", "Expertise"],
                function (index, value) {
                    if (_character.attributes[value]) {
                        let temp = $.extend(true, {}, _character).addModifiers({
                            'flat': {
                                [value]: -5
                            }
                        }).updateAttributes();
                        effectiveNegativeValues[value] = Number(
                            (temp.attributes['Damage'] - _character.attributes['Damage']).toFixed(
                                5)).toLocaleString('en-US');
                    }
                });
            modal += _character._toCard('Damage loss from -5 of attribute', effectiveNegativeValues);

            modal += '</div>';
            // End of first column

            // Second column
            modal += '<div class="col-12 col-lg-6">';

            let primaryAttributes = {};
            $.each(Attributes.PRIMARY, function (index, attribute) {
                primaryAttributes[attribute] = _character.attributes[attribute] > 0
                    ? _character.attributes[attribute] : 0;
            });
            modal += _character._toCard('Primary Attributes', primaryAttributes);

            let secondaryAttributes = {};
            $.each(Attributes.SECONDARY, function (index, attribute) {
                secondaryAttributes[attribute] = _character.attributes[attribute] > 0
                    ? _character.attributes[attribute] : 0;
            });
            modal += _character._toCard('Secondary Attributes', secondaryAttributes);

            let derivedAttributes = {};
            $.each(Attributes.DERIVED, function (index, attribute) {
                let value = _character.attributes[attribute] > 0 ? _character.attributes[attribute] : 0;
                derivedAttributes[attribute] = ['Boon Duration', 'Critical Chance', 'Critical Damage',
                    'Condition Duration'].includes(attribute) ? value.toFixed(2) + '%' : value;
            });
            modal += _character._toCard('Derived Attributes', derivedAttributes);

            let effectiveAttributes = {};
            $.each(Attributes.EFFECTIVE, function (index, attribute) {
                let value = _character.attributes[attribute] > 0 ? _character.attributes[attribute] : 0;
                effectiveAttributes[attribute] = Number(value.toFixed(5)).toLocaleString('en-US');
            });
            modal += _character._toCard('Effective Attributes', effectiveAttributes);

            let durationAttributes = {};
            let showDurations = false;
            $.each(Attributes.BOON_DURATION, function (index, attribute) {
                let value = _character.attributes[attribute] > 0 ? _character.attributes[attribute] : 0;
                if (value && value !== _character.attributes['Boon Duration']) {
                    showDurations = true;
                    durationAttributes[attribute] = value.toFixed(2) + '%';
                }
            });
            $.each(Attributes.CONDITION_DURATION, function (index, attribute) {
                let value = _character.attributes[attribute] > 0 ? _character.attributes[attribute] : 0;
                if (value && value !== _character.attributes['Condition Duration']) {
                    showDurations = true;
                    durationAttributes[attribute] = value.toFixed(2) + '%';
                }
            });
            if (showDurations) {
                modal += _character._toCard('Special Durations', durationAttributes);
            }

            let conditionAttributes = {};
            $.each(Attributes.CONDITION_DAMAGE, function (index, attribute) {
                conditionAttributes[attribute] = _character.attributes[attribute] > 0
                    ? _character.attributes[attribute].toFixed(2) : 0;
            });
            modal += _character._toCard('Condition Damage Ticks', conditionAttributes);

            modal += '</div>';
            // End of second column

            modal += '</div>';
            modal += '</div>';
            modal += '</div>';
            // End of Body

            modal += '</div>';
            modal += '</div>';
            modal += '</div>';

            return $(modal);
        };

        Character.prototype._toCard = function (title, items) {
            let card = '<div class="card card-' + this.profession
                + ' mb-3"><div class="card-header card-header-small">' + title
                + '</div><div class="card-body p-0"><table' +
                ' class="table table-sm table-hover">';
            $.each(items, function (key, value) {
                card += '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
            });
            card += '</table></div></div>';
            return card;
        };

        return Character;
    }();

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // Dropdown select
    $(Selector.DROPDOWN_SELECT).children(Selector.DROPDOWN_MENU).children(Selector.DROPDOWN_ITEM).on(
        Event.CLICK, function (e) {
            if ($(this).hasClass(ClassName.DISABLED)) {
                e.stopPropagation();
                return;
            }

            $(this).siblings(Selector.DROPDOWN_ITEM).removeClass(ClassName.ACTIVE);
            $(this).addClass(ClassName.ACTIVE);
            $(this).parent().siblings(Selector.DROPDOWN_TOGGLE).html($(this).html());
        });

    // Priorities presets
    $('[data-' + DataAttribute.PRIORITIES + ']').on(Event.CLICK, function () {
        if ($(this).data(DataAttribute.PRIORITIES) === 'power-dps') {
            $('[id^=go-checkbox-affix-]').prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.AFFIX.BERSERKER).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.ASSASSIN).prop(PropertyName.CHECKED, true);
            $(Selector.INPUT.MIN_BOON_DURATION).val(0);
        } else if ($(this).data(DataAttribute.PRIORITIES) === 'power-support') {
            $('[id^=go-checkbox-affix-]').prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.AFFIX.BERSERKER).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.ASSASSIN).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.DIVINER).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.HARRIER).prop(PropertyName.CHECKED, true);
            $(Selector.INPUT.MIN_BOON_DURATION).val(100);
        }else if ($(this).data(DataAttribute.PRIORITIES) === 'condi-dps'){
            $('[id^=go-checkbox-affix-]').prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.AFFIX.VIPER).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.SINISTER).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.AFFIX.GRIEVING).prop(PropertyName.CHECKED, true);
        }
    });

    $('[data-' + DataAttribute.PRESELECTION + ']').on(Event.CLICK, function () {

        if ($(this).data(DataAttribute.PRESELECTION) === 'dh' || $(this).data(DataAttribute.PRESELECTION) === 'qfb' ) {
            $('[id^="go-checkbox-guardian-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-guardian-bane-signet').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-fiery-wrath').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-symbolic-avenger').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-symbolic-exposure').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-zealous-blade').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-retribution').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-radiant-power').prop(PropertyName.CHECKED, true);

            if ($(this).data(DataAttribute.PRESELECTION) === 'dh'){
                $('#go-checkbox-guardian-zealots-aggression').prop(PropertyName.CHECKED, true);
                $('#go-checkbox-guardian-pure-of-sight').prop(PropertyName.CHECKED, true);
                $('#go-checkbox-guardian-big-game-hunter').prop(PropertyName.CHECKED, true);
            }else{
                $('#go-checkbox-guardian-imbued-haste').prop(PropertyName.CHECKED, true);
            }

        } else if ($(this).data(DataAttribute.PRESELECTION) === 'cfb' ){
            $('[id^="go-checkbox-guardian-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-guardian-signet-of-wrath').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-fiery-wrath').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-symbolic-exposure').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-kindled-zeal').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-right-hand-strength').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-right-hand-strength-2').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-radiant-fire').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-radiant-power').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-amplified-wrath').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-guardian-imbued-haste').prop(PropertyName.CHECKED, true);

        }else if ($(this).data(DataAttribute.PRESELECTION) === 'pbers' ){
            $('[id^="go-checkbox-warrior-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-warrior-peak-performance').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-signet-of-might').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-forceful-greatsword').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-pinnacle-of-strength').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-berserkers-power').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-warriors-sprint').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-double-standards').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-axe-mastery-one').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-axe-mastery-two').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-blood-reaction-no').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-blood-reaction-with').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-fatal-frenzy').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-warrior-bloody-roar').prop(PropertyName.CHECKED, true);

        } else if ($(this).data(DataAttribute.PRESELECTION) === 'pwea' ){
            $('[id^="go-checkbox-elementalist-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-elementalist-empowering-flame').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-burning-precision').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-power-overwhelming').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-power-overwhelming-2').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-pyromancers-training').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-ferocious-winds').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-stormsoul').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-aeromancers-training').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-bolt-to-the-heart').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-masters-fortitude').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-elements-of-rage').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-swift-revenge').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-elementalist-elemental-polyphony-fire').prop(PropertyName.CHECKED, true);

        } else if ($(this).data(DataAttribute.PRESELECTION) === 'pslb' ){
            $('[id^="go-checkbox-ranger-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-ranger-farsighted').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-predators-onslaught').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-honed-axes').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-honed-axes-2').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-furious-strength').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-twice-as-vicious').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-signet-of-the-wild').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-archetype-ferocious').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-sb-1').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-sb-2').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-ranger-sb-3').prop(PropertyName.CHECKED, true);

        } else if ($(this).data(DataAttribute.PRESELECTION) === 'pren' ){
            $('[id^="go-checkbox-rev-"]').prop(PropertyName.CHECKED, false);
            $('#go-checkbox-rev-53').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-13').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-4').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-5').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-6').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-7').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-8').prop(PropertyName.CHECKED, true);
            $('#go-checkbox-rev-11').prop(PropertyName.CHECKED, true);
        }
    });

    // Buff presets
    $('[data-' + DataAttribute.BUFFS + ']').on(Event.CLICK, function () {
        if ($(this).data(DataAttribute.BUFFS) === 'none') {
            $(Selector.INPUT.BUFFS).find(Selector.CHECKBOXES).prop(PropertyName.CHECKED, false);
        } else if ($(this).data(DataAttribute.BUFFS) === 'realistic') {
            $(Selector.INPUT.BUFFS).find(Selector.CHECKBOXES).prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.BUFF.MIGHT).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.FURY).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.VULNERABILITY).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.BANNER_OF_STRENGTH).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.BANNER_OF_DISCIPLINE).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.EMPOWER_ALLIES).prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.BUFF.SPOTTER).prop(PropertyName.CHECKED, false);
            $(Selector.CHECKBOX.BUFF.BANE_SIGNET).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.FROST_SPIRIT).prop(PropertyName.CHECKED, true);
            $(Selector.CHECKBOX.BUFF.ASSASSINS_PRESENCE).prop(PropertyName.CHECKED, true);
        } else if ($(this).data(DataAttribute.BUFFS) === 'all') {
            $(Selector.INPUT.BUFFS).find(Selector.CHECKBOXES).prop(PropertyName.CHECKED, true);
        }
    });

    // Calculate button
    $(Selector.START).on(Event.CLICK, function () {
        new Optimizer().calculate();
    });

    $(Selector.STOP).on(Event.CLICK, function () {
        STOP_SIGNAL = true;
    });

    // Modal window
    $(Selector.OUTPUT.LIST).on(Event.CLICK, 'tr', function () {
        $(this).data('character').toModal().modal('show');
        $.getScript('https://unpkg.com/armory-embeds/armory-embeds.js');
    });

    // After class select
    $('#gear-optimizer').find('> .card-nav > .nav-tabs').on('shown.bs.tab', 'a.nav-link', function () {
        $('#go-input-class').siblings().removeClass('d-none');
    });

    noUiSlider.create($('#go-condition-distribution-slider')[0], {
        range: {
            'min': [0],
            'max': [100]
        },
        start: [100, 100, 100, 100, 100],
        connect: [true, true, true, true, true, true],
        step: 1,
        pips: {
            mode: 'values',
            values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
            density: 1
        }
    });

    for (let i = 0; i < 6; i++) {
        $('#go-condition-distribution-slider')[0].querySelectorAll(
            '.noUi-connect')[i].classList.add('slider-bar-' + i);
    }

    $('#go-condition-distribution-slider')[0].noUiSlider.on('update', function (values, handle) {
        switch (handle) {
            case 0:
                $('#go-input-power-percentage').val(parseInt(values[0]));
                $('#go-input-burning-percentage').val(values[1] - values[0]);
                break;
            case 1:
                $('#go-input-burning-percentage').val(values[1] - values[0]);
                $('#go-input-bleeding-percentage').val(values[2] - values[1]);
                break;
            case 2:
                $('#go-input-bleeding-percentage').val(values[2] - values[1]);
                $('#go-input-poison-percentage').val(values[3] - values[2]);
                break;
            case 3:
                $('#go-input-poison-percentage').val(values[3] - values[2]);
                $('#go-input-torment-percentage').val(values[4] - values[3]);
                break;
            case 4:
                $('#go-input-torment-percentage').val(values[4] - values[3]);
                $('#go-input-confusion-percentage').val(100 - values[4]);
                break;
        }
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    return Optimizer;
}(jQuery);