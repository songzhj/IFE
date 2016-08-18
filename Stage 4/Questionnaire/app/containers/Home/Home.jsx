import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "react-router";
import classNames from "classnames";
import {isArray, isInteger} from "../../scripts/util";
import {Dialog, Table, Column} from "../../components";
import * as QuestionnaireActions from "../../actions/questionnaires";
import * as DialogActions from "../../actions/dialog";
import {RADIO, CHECKBOX, TEXT} from "../../constants/QuestionTypes";
import {UNRELEASED, RELEASED, CLOSED} from "../../constants/QuestionnaireStatusTypes";
import styles from "./Home.scss";

const mapStateToProps = state => ({
    questionnaires: state.questionnaires,
    dialog: state.dialog
});

const mapDispatchToProps = dispatch => ({
    actions: Object.assign({},
    bindActionCreators(QuestionnaireActions, dispatch),
    bindActionCreators(DialogActions, dispatch),
    )
});

@connect(mapStateToProps, mapDispatchToProps)
class Home extends Component {
    constructor(props) {
        super(props);
        this.handleAddQuestionnaire = this.handleAddQuestionnaire.bind(this);
        this.handleEditQuestionnaire = this.handleEditQuestionnaire.bind(this);
        this.handleRemoveQuestionnaire = this.handleRemoveQuestionnaire.bind(this);
        this.handleFillQuestionnaire = this.handleFillQuestionnaire.bind(this);
        this.handleCheckData = this.handleCheckData.bind(this);
    }

    componentWillMount() {
        const {questionnaires: {list}, actions: {closeQuestionnaire}} = this.props;
        const now = new Date().getTime() - 86400000;
        list.forEach((questionnaire, questionnaireIndex) =>
            questionnaire.status === RELEASED && questionnaire.time < now && closeQuestionnaire(questionnaireIndex)
        );
    }

    componentDidMount() {
        this.table = this.refs["table"];
    }

    handleAddQuestionnaire() {
        const {addQuestionnaire} = this.props.actions;
        addQuestionnaire();
    }

    handleEditQuestionnaire(questionnaire) {
        const {editQuestionnaire} = this.props.actions;
        return event => editQuestionnaire(questionnaire);
    }

    handleRemoveQuestionnaire(questionnaire) {
        const {dialog: {status}, actions: {removeQuestionnaire, switchDialog}} = this.props;
        const id = `remove-btn-${questionnaire}`;
        return event => {
            if (status ^ 1 && status ^ 3) {
                if (event.target === this.table.refs[id]) {
                    switchDialog(id);
                    setTimeout(() => switchDialog(id), 290);
                } else if (status === 2) {
                    if (event.target === this.table.refs["confirm-btn"]) {
                        removeQuestionnaire(questionnaire);
                        switchDialog("");
                        switchDialog("");
                    } else {
                        switchDialog(id);
                        setTimeout(() => switchDialog(id), 290);
                    }
                }
            }
        }
    }

    handleFillQuestionnaire(questionnaire) {
        const {fillQuestionnaire} = this.props.actions;
        return event => fillQuestionnaire(questionnaire);
    }

    handleCheckData(questionnaire) {
        const {checkData} = this.props.actions;
        return event => checkData(questionnaire);
    }

    render() {
        const {questionnaires: {list}, dialog} = this.props;
        return list.length ? (
            <div>
                <Table
                    ref="table"
                    data={list}
                    className={styles.table}
                >
                    <Column
                        name="标题"
                        dataKey="title"
                        width="30%"
                        align="center"
                    />
                    <Column
                        name="时间"
                        dataKey="time"
                        width="20%"
                        align="center"
                        td={({data, row, dataKey, rowIndex, colIndex}) => {
                            const time = new Date(row[dataKey]);
                            const [year, month, date] = [time.getFullYear(), time.getMonth() + 1, time.getDate()];
                            return year === 1970 ? `-` : `${year}-${month}-${date}`;
                        }}
                    />
                    <Column
                        name="状态"
                        dataKey="status"
                        width="10%"
                        align="center"
                        td={({data, row, dataKey, rowIndex, colIndex}) => {
                            return (
                                <div
                                    className={classNames({
                                        [styles.released]: row[dataKey] === RELEASED,
                                        [styles.closed]: row[dataKey] === CLOSED
                                    })}
                                >
                                    {row[dataKey]}
                                </div>
                            );
                        }}
                    />
                    <Column
                        name="操作"
                        dataKey=""
                        width="40%"
                        align="center"
                        th={({name, dataKey, colIndex}) =>
                            <div>
                                <span className={styles["btn-hint"]}>{name}</span>
                                <Link to="edit" className={styles.link}>
                                    <input type="button"
                                            value="新建问卷"
                                            className={styles["add-btn"]}
                                            onClick={this.handleAddQuestionnaire}
                                    />
                                </Link>
                            </div>
                        }
                        td={({data, row, dataKey, rowIndex, colIndex}) =>
                            row.status === RELEASED ? (
                                <div>
                                    <Link to="/fill" className={styles.link}>
                                        <input type="button"
                                                value="填写问卷"
                                               className={styles.btn}
                                               onClick={this.handleFillQuestionnaire(rowIndex)}
                                        />
                                    </Link>
                                    <Link to="/check" className={styles.link}>
                                        <input type="button"
                                               value="查看数据"
                                               className={styles.btn}
                                               onClick={this.handleCheckData(rowIndex)}
                                        />
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    {row.status === UNRELEASED ? (
                                        <Link to="/edit" className={styles.link}>
                                            <input type="button"
                                                   value="编辑问卷"
                                                   className={styles.btn}
                                                   onClick={this.handleEditQuestionnaire(rowIndex)}
                                            />
                                        </Link>
                                    ) : (
                                        <Link to="/check" className={styles.link}>
                                            <input type="button"
                                                   value="查看数据"
                                                   className={styles.btn}
                                                   onClick={this.handleCheckData(rowIndex)}
                                            />
                                        </Link>
                                    )}
                                    <input type="button"
                                            ref={`remove-btn-${rowIndex}`}
                                            value="删除问卷"
                                            className={styles.btn}
                                           onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                    />
                                    <Dialog
                                        dialog={dialog}
                                        self={this.table || {}}
                                        id={`remove-btn-${rowIndex}`}
                                        onLeave={this.handleRemoveQuestionnaire(rowIndex)}
                                        title={"提示"}
                                    >
                                        <div className={styles.dialog}>
                                            <div>
                                                <p>{`确认删除问卷？`}</p>
                                            </div>
                                            <div className={styles["btn-wrap"]}>
                                                <Link to="/" className={styles.link}>
                                                    <input type="button"
                                                            ref="confirm-btn"
                                                            value="确定"
                                                            className={styles.btn}
                                                           onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                    />
                                                </Link>
                                                <input type="button"
                                                       value="取消"
                                                       className={styles.btn}
                                                       onClick={this.handleRemoveQuestionnaire(rowIndex)}
                                                />
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            )
                        }
                    />
                </Table>
            </div>
        ) : (
            <div className={styles.wrap}>
                <Link to="/edit" className={styles.link}>
                    <div
                        className={styles["add-btn"]}
                        onClick={this.handleAddQuestionnaire}
                    >
                        <span>新建问卷</span>
                    </div>
                </Link>
            </div>
        );
    }
}

export default Home;