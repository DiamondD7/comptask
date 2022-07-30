
import Cookies from 'js-cookie';
import React from 'react';
import { Pagination } from 'semantic-ui-react';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { CreateJob } from '../CreateJob/CreateJob.jsx';
export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)

        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 2,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            offset: 0,
            currentPage: 1,
            perPage: 3,
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
        //your functions go here
    };

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData);
        loaderData.isLoading = false;
        this.setState({ loaderData });
        /*this.loadData((callback) =>
            this.setState({ loaderData })
        );*/
        /*        this.setState({ loaderData });*///comment this

        //set loaderData.isLoading to false after getting data

        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.loadData();
    };

    //http://localhost:51689

    loadData() {
        var link = 'https://competitionweb.azurewebsites.net/talent/listing/listing/getEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        var currentthis = this;

        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                let loadJobs = null;
                /*const data = res.myJobs;
                const x = data.slice(
                    this.state.offset,
                    this.state.offset + this.state.perPage
                );
                console.log(res.myJobs.length);
                console.log(x.length);*/
                currentthis.setState({
                    loadJobs: res.myJobs,
                    totalPages: Math.ceil(res.myJobs.length / this.state.perPage)
                })
                if (res.myJobs) {
                    /*currentthis.setState({
                        loadJobs: res.myJobs.slice(this.state.offset, this.state.offset + this.state.perPage)
                    })*/
                    //currentthis.setState({ loadJobs: x })
                    //loadJobs = res.myJobs //idk if this is right.
                    //console.log("data", res.myJobs);
                    //this.setState({ loadJobs: res.myJobs })
                }

            }.bind(this),
            error: function (res) {
                console.log(res.status)
            }
        })

        this.init();
    }


    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    handlePageClick(e, { activePage }) {
        this.setState({ currentPage: activePage })
        /*console.log("this is: ", e.target.activePage);
        const selectedPage = num.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState(
            {
                currentPage: selectedPage,
                offset: offset
            },
            () => {
                this.loadData();
            }
        );*/
    };


    render() {
        const itemsPerPage = 3;
        const { currentPage } = this.state;
        const items = this.state.loadJobs.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage);
        return (
            <div>
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <div className="ui container">
                        <h1>List of Jobs</h1>
                        <div className="ui multiple dropdown">
                            <input type="hidden" name="filters" />
                            <i className="filter icon"></i>
                            <span className="text">Filter Posts</span>
                            <div className="menu">
                                <div className="ui icon search input">
                                    <i className="search icon"></i>
                                    <input type="text" placeholder="Search tags..." />
                                </div>
                                <div className="divider"></div>
                                <div className="header">
                                    <i className="tags icon"></i>
                                    Tag Label
                                </div>
                                <div className="scrolling menu">
                                    <div className="item" data-value="important">
                                        <div className="ui red empty circular label"></div>
                                        Important
                                    </div>
                                    <div className="item" data-value="announcement">
                                        <div className="ui blue empty circular label"></div>
                                        Announcement
                                    </div>
                                    <div className="item" data-value="cannotfix">
                                        <div className="ui black empty circular label"></div>
                                        Cannot Fix
                                    </div>
                                    <div className="item" data-value="news">
                                        <div className="ui purple empty circular label"></div>
                                        News
                                    </div>
                                    <div className="item" data-value="enhancement">
                                        <div className="ui orange empty circular label"></div>
                                        Enhancement
                                    </div>
                                    <div className="item" data-value="off-topic">
                                        <div className="ui yellow empty circular label"></div>
                                        Off Topic
                                    </div>
                                    <div className="item" data-value="interesting">
                                        <div className="ui pink empty circular label"></div>
                                        Interesting
                                    </div>
                                    <div className="item" data-value="discussion">
                                        <div className="ui green empty circular label"></div>
                                        Discussion
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card--jobs">
                            {items.map(data => <div key={data.id}><JobSummaryCard id={data.id} title={data.title} country={data.location.country} city={data.location.city} summary={data.summary} /></div>)}
                        </div>

                        <Pagination
                            activePage={this.state.currentPage}
                            firstItem={null}
                            lastItem={null}
                            pointing
                            secondary
                            totalPages={this.state.totalPages}
                            onPageChange={this.handlePageClick}
                        />

                    </div>

                </BodyWrapper >
            </div>
        )
    }
}