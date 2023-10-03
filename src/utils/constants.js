export const categories = (
    faBaseballBatBall,
    faBullhorn,
    faShirt,
    faMusic,
    faClapperboard
) => {
    return [
        { name: 'Sports', href: 'sports', icon: faBaseballBatBall },
        { name: 'Entertainment', href: 'entertainment', icon: faClapperboard },
        { name: 'Fashion', href: 'fashion', icon: faShirt },
        { name: 'Politics', href: 'politics', icon: faBullhorn },
        { name: 'Music', href: 'music', icon: faMusic },
    ]
}
