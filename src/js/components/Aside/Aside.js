import { Component } from "../../framework";
import { Favorites } from "./Favorites";
import { SearchHistory } from "./SearchHistory";

export default class Aside extends Component {
    constructor(host,props) {
        super(host,props);
    }

    render() {
        return [
                    {
                        tag : Favorites,
                        tagName : "section",
                        classList : [
                            "aside__block",
                            "aside__block_favorites",
                            "custom_background_components"
                          ],
                    },
                    {
                        tag : SearchHistory,
                        tagName : "section",
                        classList : [
                            "aside__block",
                            "aside__block_history",
                            "custom_background_components"
                        ],
                    },
                ];
    }
}