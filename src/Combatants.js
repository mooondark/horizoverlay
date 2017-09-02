import React, { Component } from 'react'
import CombatantHorizontal from './CombatantHorizontal'

class Combatants extends Component {
  shouldComponentUpdate() {
    // if data is empty then don't re-render
    if (Object.getOwnPropertyNames(this.props.data).length === 0) {
      return false
    }

    return true
  }
  render() {
    const maxRows = 10
    const dataArray = Object.keys(this.props.data)
    const battler = dataArray.slice(0, maxRows - 1)
    let rows = []
    let combatant
    let isSelf

    for (const ref in battler) {
      combatant = this.props.data[battler[ref]]

      // We'll change the global 'YOU' name in case it's, well, you
      isSelf = combatant.name.toUpperCase() === 'YOU'
      // In case you changed your name in ACT and in the overlay config
      isSelf = this.props.config.characterName === combatant.name

      // We need to reasign it here since it will call a reference
      const rank = parseInt(ref + 1, 10)

      // don't need to render this component if this is a limit break
      // if (!combatant.name.toLowerCase() === 'limit break')
      rows.push(
        <CombatantHorizontal
          encounterDamage={this.props.encounterDamage}
          rank={rank}
          data={combatant}
          config={this.props.config}
          isSelf={isSelf}
          key={battler[ref]}
        />
      )
    }
    return <div className="combatants">{rows}</div>
  }
}

export default Combatants
