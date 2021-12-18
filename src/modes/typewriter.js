import { writeEffect } from '../helpers/writeEffect'
import { onAnimationEnd } from '../helpers/onAnimationEnd'
import { cleanChildText } from '../helpers/cleanChildText'

/** @type {import('types').TypewriterOptions} */
const mode = async (elements, options) => {
	if (options.cascade) {
		cleanChildText(elements)
	} else {
		const { getLongestTextElement } = await import('../helpers/getLongestTextElement')
		const lastElementToFinish = getLongestTextElement(elements)
		onAnimationEnd(lastElementToFinish, () => options.dispatch('done'))
	}
	for (let i = 0; i < elements.length; i++) {
		let element = elements[i]

		// Cascade mode
		if (options.cascade) {
			await writeEffect(element, options)
			element.currentNode.classList.replace('typing', 'finished-typing')
			if (i + 1 === elements.length && options.cursorAfterEnd) {
				element.currentNode.classList.add('cursor-displayed')
			}
			// Default mode
		} else {
			writeEffect(element, options).then(() => {
				element.currentNode.classList.replace('typing', 'finished-typing')
				if (options.cursorAfterEnd) {
					element.currentNode.classList.add('cursor-displayed')
				}
			})
		}
	}

	options.cascade && options.dispatch('done')
}

export { mode }
