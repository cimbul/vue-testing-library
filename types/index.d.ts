// TypeScript Version: 3.0
import { ThisTypedMountOptions, VueClass } from '@vue/test-utils'
import Vue from 'vue'
import { Store, StoreOptions } from 'vuex'
import Router, { RouterOptions, RouteConfig } from 'vue-router'
import { getQueriesForElement, BoundFunctions, queries, EventType, FireFunction } from '@testing-library/dom'

// NOTE: fireEvent is overridden below
export * from '@testing-library/dom'

export function cleanup(): void

export interface RenderOptions<V extends Vue, S = {}> extends
    // The props and store options special-cased by vue-testing-library and NOT passed to mount().
    // In TS 3.5+: Omit<ThisTypedMountOptions<V>, "store" | "props">
    Pick<ThisTypedMountOptions<V>, Exclude<keyof ThisTypedMountOptions<V>, "store" | "props">> {
  props?: object
  store?: StoreOptions<S>
  routes?: RouteConfig[]
}

export type ConfigurationCallback<V extends Vue> =
  (vue: V, store: Store<any>, router: Router) => Partial<ThisTypedMountOptions<V>> | void

export type ComponentHarness = BoundFunctions<typeof queries> & {
  container: HTMLElement
  baseElement: HTMLBodyElement
  debug(el?: HTMLElement): void
  unmount(): void
  isUnmounted(): boolean
  html(): string
  emitted(): { [name: string]: any[][] }
  updateProps(props: object): Promise<void>
}

export function render<V extends Vue>(
  TestComponent: VueClass<V>,
  options?: RenderOptions<V>,
  configure?: ConfigurationCallback<V>
): ComponentHarness

export type AsyncFireObject = {
  [K in EventType]: (element: Document | Element | Window, options?: {}) => Promise<void>
}

export interface VueFireObject extends AsyncFireObject {
  touch(element: Document | Element | Window): Promise<void>
  update(element: HTMLOptionElement): Promise<void>
  update(element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value?: string): Promise<void>
}

export const fireEvent: FireFunction & VueFireObject
