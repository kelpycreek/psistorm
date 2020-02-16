// Here's the whole tech tree!

export var weapons = [
  {
    name: "AX-32 Tiger Shark Pistol",
    short: "1d6 damage, range 6, 1 hand",
    long: "Special(Lightning Hands): Once on your turn if you are holding a pistol you may use it to make a strike without using an action.",
    prereqs: []
  },
  {
    name: "Longtooth SR",
    short: "1d12 damage, 20 range, 2 hands",
    long: "You have disadvantage on attack rolls with this weapon if you moved this turn. Special(Aim): You can use an action to aim with this weapon. If you do, you gain advantage on the next attack roll you make with it before the end of your turn.",
    prereqs: []
  },
  {
    name: "Scorpion AR",
    short: "1d8 damage, range 8, 2 hands",
    long: "Special(Burst Fire): You can use two actions to fire 3 shots simultaneously with this weapon, all at a -4 penalty",
    prereqs: []
  }
]

export var abilities = [
  {
    name: "Force Barrier",
    short: "Youve spent hundreds of hours practicing your personal forcefield, increasing its potency so it can take even larger hits.",
    long: "When you manifest your Force Barrier you can spend up to 4 psipoints",
    prereqs: []
  },
  {
    name: "Force Barrier 2",
    short: "You've spent hundreds of hours practicing your personal forcefield, increasing it's ptency so it can take even larger hits.",
    long: "When you manifest your Force Barrier you can spend up to 4 psipoints",
    prereqs: ["Force Barrier"]
  },
  {
    name: "AR Proficiency",
    short: "You've been trained in the use of Assault Rifles",
    long: "You can use the Special fire mode of an assault rifle",
    prereqs: []
  },
  {
    name: "Burst Fire Specialist",
    short: "You've learned the exact recoil of your weapon and can control your burst fire with incredible accuracy",
    long: "When you use the burst fire special of an assault rifle, you reduce the penalty you take for burst firing by 2",
    prereqs: ["AR Proficiency"]
  },
  {
    name: "Pistol Proficiency",
    short: "You've been trained in the use of Pistols",
    long: "You can use the Special fire mode of a Pistol",
    prereqs: []
  },
  {
    name: "Dual Pistol Wielder",
    short: "You're trained in using two pistols",
    long: "If you are holding two weapons that each have the Lightning Hands special, you can use both of them to make a strike at different targets simultaneously.",
    prereqs: ["Pistol Proficiency"]
  },
  {
    name: "Pistol Specialist",
    short: "You're a master of small firearms, making dozens of shots quickly and accurately.",
    long: "You apply only half the multiple attack penalty to attacks you make with a pistol",
    prereqs: ["Pistol Proficiency"]
  },
  {
    name: "SR Proficiency",
    short: "You've been trained in the use of Sinper Rifles",
    long: "You can use the Special fire mode of a Sinper Rifle",
    prereqs: []
  },
  {
    name: "One Shot, One Kill",
    short: "You can line up a deadly shot given enough time",
    long: "You can use the following special with any weapon that has the Aim special: Special(Deadshot): 3 actions. If the first action you make on your next turn is to make an attack, that attack gains advantage and deals triple your weapon damage. This counts as a crit.",
    prereqs: ["SR Proficiency"]
  },
  {
    name: "Fast Swap",
    short: "You've learned to switch quickly between your weapons.",
    long: "Once per turn you can perform a swap weapon action without spending an action.",
    prereqs: ["Pistol Proficiency", "AR Proficiency", "SR Proficiency"]
  },
  {
    name: "Mind Sense",
    short: "You can identify the psyche of creatures near you, even if you can't see them.",
    long: "1 Psipoint: You sense each creature within range 8 of you, even if you can't see them or draw line of sight to them. You know the exact whereabouts of these creatures.",
    prereqs: []
  },
  {
    name: "Mind Sense 2",
    short: "Your ability to sense minds now extends to your vision, allowing you to see through walls.",
    long: "When you use your Mind Sense ability, you now also sense each creature that is up to 10 feet through a barrier you can see.",
    prereqs: ["Mind Sense"]
  },
  {
    name: "Psychic Assault",
    short: "You can unleash your psychic powers on an enemy in order to overload their mind. Stopping vital organs or rupturing blood vessels.",
    long: "1 action, 1 psipoint: a target you can psychically sense must succeed at a save or take 1d8 mental damage.",
    prereqs: ["Mind Sense"]
  },
  {
    name: "Psychic Assault 2",
    short: "You can unleash an even more devastating psychic assault, killing people with little more then a glance",
    long: "2 actions, 2 psipoints: a target you can see must succeed at a save or take 3d8 mental damage.",
    prereqs: ["Psychic Assault"]
  },
  {
    name: "Heart Attack",
    short: "Your psychic assaults leave no trace on their victim, shutting down their nervous system before they can even scream.",
    long: "When you kill an enemy with psychic damage, they drop dead soundlessly and without any sign of what killed them.",
    prereqs: ["Psychic Assault"]
  },
  {
    name: "Overwatch",
    short: "You watch your target, waiting for them to expose themselves so you can take your shot.",
    long: "1 action: Choose a target. The next time that target takes a move action before your next turn you may use your reaction to strike at them. They don't get the benefit of cover against this attack.",
    prereqs: []
  },
  {
    name: "Sprint",
    short: "You can channel your psychic energy into incredible feats of speed.",
    long: "When you move, you can spend 1 psipoint to either move twice as far or jump up to half your speed vertically.",
    prereqs: []
  }
]

// movement
// telekinesis
// barriers
// pyro?
// techno?
// illusions
// psychic bullets


var abilityTemplate = {
    name: "",
    short: "",
    long: "",
    prereqs: []
  }

var weaponTemplate = {
    name: "",
    short: "",
    long: "",
    prereqs: []
  }