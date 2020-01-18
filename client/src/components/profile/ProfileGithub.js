import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos, error }) => {
    useEffect(() => {
        getGithubRepos(username);
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <hr />
            <h2 className="text-info mb-4">Latest GitHub Repos</h2>
            {repos.length === 0 && error.msg === "Not Found" ? <h4>No repos found</h4> : (
                repos.map(repo => (
                    <div key={repo.id} className="card card-body mb-2">
                        <div className="row">
                            <div className="col-md-6">
                                <h4>
                                    <a className="text-info" href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                                        {repo.name}
                                    </a>
                                </h4>
                                <p>{repo.description}</p>
                            </div>
                            <div className="col-md-6">
                                <span className="badge badge-info mr-1">
                                    Stars: {repo.stargazers_count}
                                </span>
                                <span className="badge badge-secondary mr-1">
                                    Watchers: {repo.watchers_count}
                                </span>
                                <span className="badge badge-success">
                                    Forks: {repo.forks_count}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </Fragment>
    )
}

ProfileGithub.propTypes = {
    getGithubRepos: PropTypes.func.isRequired,
    repos: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
    repos: state.profile.repos,
    error: state.profile.error
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub)
