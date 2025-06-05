import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('muestra el mensaje enviado por props', () => {
    const wrapper = mount(HelloWorld, {
      props: {
        msg: 'Hola Erica!'
      }
    })
    expect(wrapper.text()).toContain('Hola Erica!')
  })
})
