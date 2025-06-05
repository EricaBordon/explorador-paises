import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Buscador from '../src/components/Buscador.vue'

describe('Buscador.vue', () => {
  it('renderiza el input con el valor inicial', () => {
    const wrapper = mount(Buscador, {
      props: {
        modelValue: 'Argentina'
      }
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Argentina')
  })

  it('emite update:modelValue cuando el valor cambia', async () => {
    const wrapper = mount(Buscador, {
      props: {
        modelValue: ''
      }
    })
    const input = wrapper.find('input')
    await input.setValue('Paraguay')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['Paraguay'])
  })
})
