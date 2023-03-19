import type {
  TAstType,
  TBlockAst,
  TIndexAst,
  TIndexItemAst,
  TIndexFromAst,
} from '../types'

import { ensureArr, emptyArr } from '@keg-hub/jsutils'

/**
 * Gets the last child of the passed in parent
 * By default we always add a child to a parent after the last child
 */
const getLastChild = (
  parent:TAstType,
  key:string,
) => {
  const children = ensureArr(parent[key as keyof typeof parent])
  return children[children.length - 1]
}

/**
 * Gets the last child index of the passed in parent or the parents index
 * By default we always add a child to a parent after the last child or after the parent index
 */
const getBeforeIndex = (
  parent:TAstType,
  key:string,
) => {
  const lastChild = getLastChild(parent, key)
  return lastChild?.index || parent.index
}

/**
 * Checks all empty and comment block types for a matching index
 * If a match if found then add 1 to the index and check again
 * This ensures we don't overwrite an existing comment or empty line
 *
 */
const checkBlocks = (blocks:TBlockAst[], idx:number):number => {
  const filtered = blocks.filter(block => block.index <= idx)
  const match = filtered.find(block => block.index === idx)

  return match ? checkBlocks(filtered, idx + 1) : idx
}

const findNextIndex = ({
  parent,
  feature,
  key,
}:TIndexFromAst) => {
  const beforeIdx = getBeforeIndex(parent, key)
  return checkBlocks(
    [
    ...(feature.empty || emptyArr),
    ...(feature.comments || emptyArr)
  ], beforeIdx + 1)
}

/**
 * Updates the passed in child index in place
 * Does not create a new child
 * Then updates the indexes array.
 * Dose not create a new indexes array
 */
const updateChildIndex = (props:TIndexFromAst, nextIdx:number) => {
  const {child, parent, indexes} = props

  child.index = nextIdx
  indexes.splice(nextIdx, 0, { ast: child, parent } as TIndexItemAst)

  return indexes
}

/**
 * Updates the index of all items that come after the refIndex by some amount
 * Update amount defaults by 1
 * Creates a new Indexes Array, but not child index items
 */
const reIndex = (indexes:TIndexAst, refIndex:number, amount:number=1) => {
  const reIndexed = indexes.reduce((acc, item, idx) => {
    if(idx > refIndex) item.ast.index = item.ast.index + amount

    acc.push(item)

    return acc
  }, [] as TIndexItemAst[])

  return {
    amount,
    index: refIndex,
    indexed: reIndexed,
  }
}

/**
 * Gets the new index to be set on the passed in child from the passed in parent
 * Then updates all items with an index greater than new index 
 */
export const indexFromAst = (props:TIndexFromAst) => {
  const nextIdx = findNextIndex(props)
  const updatedIndex = updateChildIndex(props, nextIdx)

  return reIndex(updatedIndex, nextIdx)
}

/**
 * Alt pattern for updating a child index
 * Keeping incase it's needed at a later time

    child.index = nextIdx
    const beforeArr = indexes.slice(0, nextIdx)
    const afterArr = indexes.slice(nextIdx)
    beforeArr[nextIdx] = child

    const updatedIndexes = beforeArr.concat(
      afterArr.map(item => {
        item.index = item.index + 1
        return item
      })
    )

 */