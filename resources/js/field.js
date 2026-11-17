import { DependentFormField, HandlesValidationErrors } from 'laravel-nova'

Nova.booting((app) => {
    const parseValue = (value) => {
        if (Array.isArray(value)) {
            return value
        }

        try {
            return value ? JSON.parse(value) : []
        } catch (error) {
            return []
        }
    }

    const DatabaseArrayForm = {
        mixins: [DependentFormField, HandlesValidationErrors],

        props: ['resourceName', 'resourceId', 'field'],

        data() {
            return {
                items: parseValue(this.field.value),
            }
        },

        mounted() {
            this.field.fill = this.fill
            this.currentField.fill = this.fill
        },

        methods: {
            addItem() {
                this.items.push('')
            },

            removeItem(index) {
                this.items.splice(index, 1)
            },

            fill(formData) {
                this.fillIfVisible(
                    formData,
                    this.field.attribute,
                    JSON.stringify(this.items.filter(Boolean))
                )
            },
        },

        template: `
            <div v-if="currentField.visible" class="md:flex md:flex-row space-y-2 md:space-y-0 py-5">
                <div class="w-full md:mt-2 px-6 md:px-8 md:w-1/5">
                    <label class="inline-block leading-tight space-x-1">
                        <span>{{ currentField.name }}</span>
                    </label>
                </div>
                <div class="mt-1 md:mt-0 pb-5 px-6 md:px-8 md:w-3/5 w-full md:py-5">
                    <div v-if="items.length">
                        <div
                            v-for="(item, index) in items"
                            :key="index"
                            class="flex items-center gap-3 py-2"
                        >
                            <select
                                v-model="items[index]"
                                class="form-control form-input form-input-bordered flex-1"
                            >
                                <option value="">Selecteer een vraag</option>
                                <option
                                    v-for="(label, value) in currentField.options"
                                    :key="value"
                                    :value="String(value)"
                                >
                                    {{ label }}
                                </option>
                            </select>
                            <button
                                type="button"
                                class="px-3 py-2 text-red-600"
                                @click="removeItem(index)"
                            >
                                Verwijderen
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        class="mt-3 px-4 py-2 bg-primary-500 rounded-lg text-white font-bold shadow hover:bg-primary-600 focus:outline-none focus:ring"
                        @click="addItem"
                    >
                        Vraag toevoegen
                    </button>
                </div>
            </div>
        `,
    }

    const DatabaseArrayDisplay = {
        props: ['field'],

        computed: {
            items() {
                return parseValue(this.field.value)
            },
        },

        template: `
            <div class="flex flex-col md:flex-row -mx-6 px-6 py-2 md:py-0 space-y-2 md:space-y-0">
                <div class="md:w-1/4 md:py-3">
                    <h4 class="font-bold md:font-normal">
                        <span>{{ field.name }}</span>
                    </h4>
                </div>
                <div class="md:w-3/4 md:py-3 break-all lg:break-words">
                    <div class="text-90 flex items-center">
                        <ul v-if="items.length" class="list-disc list-inside">
                            <li v-for="(item, index) in items" :key="index">
                                {{ field.options[item] || item }}
                            </li>
                        </ul>
                        <span v-else>Geen</span>
                    </div>
                </div>
            </div>
        `,
    }

    app.component('form-nova-component-select-database-field', DatabaseArrayForm)
    app.component('index-nova-component-select-database-field', DatabaseArrayDisplay)
    app.component('detail-nova-component-select-database-field', DatabaseArrayDisplay)
})
