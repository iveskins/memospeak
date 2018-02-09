import React from 'react'
import PropTypes from 'prop-types'

import {
  WordAdded,
  WordCorrect,
  WordMissing,
  WordPair
} from './words'

const showDiff = (diff) => {
  let skipNextWord = false
  const result = []

  for (let i = 0; i < diff.length; i++) {
    if (skipNextWord) {
      skipNextWord = false
      continue
    }

    const currentPart = diff[i]
    let el = null
    if (currentPart.added) {
      el = <WordAdded value={currentPart.value} />
    } else if (currentPart.removed) {
      // Check if the next word is added; if yes treat it as one
      if (i < diff.length - 1) {
        const nextPart = diff[i + 1]
        if (nextPart && nextPart.added) {
          el = (
            <WordPair missing={currentPart.value} added={nextPart.value} />
          )
          skipNextWord = true
        }
      } else {
        el = <WordMissing value={currentPart.value} />
      }
    } else {
      el = <WordCorrect value={currentPart.value} />
    }
    result.push(el)
  }

  return result
}

const Diff = ({ diff }) => {
  return (
    <div>
      {showDiff(diff)}
    </div>
  )
}

Diff.propTypes = {}
Diff.defaultProps = {}

export default Diff