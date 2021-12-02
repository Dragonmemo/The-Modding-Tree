addLayer("T255", {
    name: "Tier 0", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "255", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "powerer", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	//doReset(){layer.DataReset(this.layer)}
});
addLayer("T254", {
    name: "Tier 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "254", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FEFEFE",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "powererer", // Name of prestige currency
    baseResource: "powerer", // Name of resource prestige is based on
    baseAmount() {return player["T255"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1./3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
	//doReset(){layer.DataReset(this.layer)}
});
addLayer("Scraps", {
    name: "Scraps", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FCAC40",
    resource: "scraps", // Name of prestige currency
    baseResource: "power", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "custom",
	prestigeButtonText(){return "Use all your power on a machine making scraps of features<br>"+parseInt(getResetGain(this.layer))+" Scraps"},
	getResetGain(){
		return Decimal.log10(player.points)
	},
	getNextAt(){
		return new Decimal(1)
	},
	canReset(){return Decimal.gte(player.points,10)},
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: "side", // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "S: Dismantle the tree and get your scraps", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	//doReset(){
	//	var i;
	//	for (i=255;i>253;i--){layerDataReset("T"+i)}
	//	},
    layerShown(){return true}
})

function createUpgrades(layerInfo, id){
	let upgRand = random();
	let et = (r==1?"NONE":layersForEffects[r-1][Math.floor(1-upgRand)]);
	layerInfo.upgrades[id] = {
		unlocked() { return player[this.layer].unlocked },
		et: et,
		layer: layerInfo.name,
		title: layerInfo.name+String(id),
		description() { return ((et!="NONE"?tmp[et].type=="static":false)?("Divide "+(et=="NONE"?"point":(et+" point"))+" requirement"):("Multiply "+(et=="NONE"?"point":(et+" point"))+" gain"))+" based on "+(sourceName=="NONE"?"points":(sourceName+" points"))},
		cost: new Decimal(1eid),
		effect() { 
			let exp;
			if (this.et == "NONE") exp = new Decimal(1);
			else exp = tmp[this.et].exponent;
			let amt;
			if (this.sourceName == "NONE") amt = player.points;
			else amt = player[this.sourceName].points;
			eff = new Decimal(amt||0).max(0.5).plus(1)
			if (this.sourceName!="NONE" ? tmp[this.sourceName].type=="static" : false) eff = Decimal.pow(tmp[this.sourceName].base, eff).pow(tmp[this.sourceName].exponent).pow(exp).pow(RNG_DATA.rowLayerTotalMultExps[tmp[this.layer].row].times(this.iuf))
			else eff = eff.root((this.sourceName=="NONE")?1:tmp[this.sourceName].exponent).pow(exp).pow(RNG_DATA.rowLayerTotalMultExps[tmp[this.layer].row].times(this.iuf)) 
			return eff;
		},
		effectDisplay() { return format(tmp[this.layer].upgrades[this.id].effect)+"x" },
	}
	uLeft = Math.max(uLeft-internalUpgFactor, 0);
}