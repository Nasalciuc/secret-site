const handleClickOutside = []

export default [
    {
        name: 'click-outside',
        methods: {
            mounted(el, binding) {
                const key = +(handleClickOutside[handleClickOutside.length - 1]?.key ?? '-1')

                handleClickOutside.push({
                    key: key + 1,
                    func: (event) => {
                        if (!el.contains(event.target) && el !== event.target) {
                            binding.value(event, el.dataset.index)
                        }
                    },
                })

                el.setAttribute('event-index', key + 1)

                document.addEventListener('click', handleClickOutside[handleClickOutside.length - 1].func)
            },
            beforeUnmount(el) {
                const key = +el.getAttribute('event-index')
                const index = handleClickOutside.findIndex((cur) => cur.key === key)

                document.removeEventListener('click', handleClickOutside[index].func)

                handleClickOutside.splice(index, 1)
            },
        },
    },
    {
        name: 'mounted',
        methods: {
            mounted(el, binding) {
                binding.instance.$nextTick(() => {
                    const promises = Array.from(el.querySelectorAll('img')).map((cur) => {
                        return new Promise((resolve) => {
                            cur.onload = resolve
                        })
                    })

                    Promise.all(promises).then(binding.value)
                })
            },
        },
    },
]
