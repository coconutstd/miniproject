<template>
    <div>
        <h1 v-if="error.statusCode === 404">Page not found</h1>
        <h1 v-else>An error occurred</h1>
        <p>죄송합니다</p>
    </div>
</template>

<script>
export default {
    name: "ErrorPage",
    layout: "error", // you can set a custom layout for the error page
    props: {
        error: {
            type: Object,
            default: () => {},
        },
    },
}
</script>
