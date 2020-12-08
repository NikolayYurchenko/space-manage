export default function closeModal (flag, state, cb) {
    this[flag] = state
    cb && cb()
}
