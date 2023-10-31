export function HomePage () {
    return (
        <section>
            <form class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1">@</span>
                <input
                    type="text"
                    class="form-control"
                    placeholder="Type a GitHub username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
            </form>
        </section>
    )
}