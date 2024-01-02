import type {
  TIndexAst,
  TFeatureAst,
  TIndexItemAst,
} from '../types'

import { findIndex } from './findIndex'
import { exists } from '@keg-hub/jsutils/exists'

/**
 * Helper method that calculates the location of an item within the index array
 * Maintains an offset array the keeps track of item locations when duplicate indexes exist
 * If a duplicate it found, the new item is added after the existing item using splice
 * It then stores an offset to know how far from the original index an item was moved
 *
 * **IMPORTANT** - This modifies the indexes array and it's items indexes in-place
 * Items with duplicate indexes will have their indexes updated to their new location
 * The item will NOT be copied!
 */
export const addToIndexes = (
  feature:TFeatureAst,
  indexes:TIndexAst,
  item:TIndexItemAst,
  offset:number[]
) => {
  const index = exists(item.ast.index)
    ? item.ast.index
    : findIndex({
        feature,
        parent: item.parent,
        type: item.ast.type,
      })

  // Get the offset up to the current index
  const preAmount = offset.reduce((acc, val, idx) => {
    return idx <= index && exists(val) ? acc + val : acc
  }, 0)

  // No item and no offset up to the index, then add the item
  if(!indexes[index] && !preAmount){
    indexes[index] = item
    return indexes
  }

  // Otherwise add 1 to the offset and preAmount
  // To account for the current duplicate 
  offset[index] = exists(offset[index]) ? offset[index] + 1 : 1

  // Add it to the index, to get the new index location
  // The preAmount happens on duplicate index
  // But does not include the current duplicate
  // So we add 1 for to account for it
  const newIdx = index + preAmount + 1

  // Update the item to now have a new index
  item.ast.index = newIdx

  // Get the length of the current items
  const updatedLen = indexes.length + 1

  // If the newIndex is within it
  // Then call splice to add it at the index
  // Otherwise calculate the diff in length and add empty spaces for non-existing items
  newIdx <= updatedLen
    ? indexes.splice(newIdx, 0, item)
    : indexes.splice(newIdx, 0, ...Array(newIdx - updatedLen), item)

  return indexes
}
