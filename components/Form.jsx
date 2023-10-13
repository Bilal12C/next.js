import Link from "next/link"

function Form({
    type,
    post,
    setposts,
    submitting,
    handlesubmitting
}) {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} posts</span>
            </h1>
            <p className="desc text-left max-w-wd">
                {type} and share Amazing prompts with the world , let your imagination go wild with any AI-powered Platform
            </p>
            <form onSubmit={handlesubmitting} className="mt-10 w-full max-w-3xl flex flex-col gap-7 glassmorphism">
                <label>
                    <span className="font-satoshi font-semibold text-base text-grey-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        value={post.promptname}
                        className="form_textarea"
                        required
                        placeholder="Enter your Prompt Here...."
                        onChange={(e) => setposts({ ...post, promptname: e.target.value })}
                    />
                </label>
                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag
                        <span className="font-normal">(#product,#webdevelopment)</span>
                    </span>
                    <input
                        value={post.tag}
                        placeholder="#Tag"
                        className="form_input"
                        required
                        onChange={(e) => setposts({ ...post, tag: e.target.value })}
                    />
                </label>
                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link href={'/'} className="text-gray-500 text-sm">
                      Cancel
                    </Link>
                    <button
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-1.5 text-sm bg-primary-orange text-white rounded-full"
                    > 
                    {submitting ? `${type}...`:type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form