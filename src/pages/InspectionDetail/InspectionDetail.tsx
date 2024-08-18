import React, {useCallback, useEffect, useState} from "react";
import './index.css'
import Card from "./Card";
import {inspectionService} from "../../services/inspection.service";
import {useParams} from "react-router-dom";

interface IQuestionItem {
    questionRender: () => React.ReactNode;
    answerRender: () => React.ReactNode;
}

interface IQuestionColumnDef {
    title: string,
    questions: IQuestionItem[];
}

const ADDITIONAL_QUESTION = 'Do you want to attach additional photos?';

const InspectionDetail = () => {

    const {id} = useParams()

    const [inspection, setInspection] = useState<WorkdayInspection>();
    const [questionList, setQuestionList] = useState<InspectionQuestionData>();
    const [questionDef, setQuestionDef] = useState<IQuestionColumnDef[]>();

    const getInspectionDetail = useCallback(async () => {
        const {data} = await inspectionService.getInspection(id);
        setInspection(data[0]);
    }, [id]);
    const getInspectionQuestion = useCallback(async () => {
        const {data: {data}} = await inspectionService.getInspectionQuestion();
        setQuestionList(data);
    }, []);

    useEffect(() => {
        getInspectionDetail();
        getInspectionQuestion();
    }, [getInspectionDetail, getInspectionQuestion]);

    useEffect(() => {
        if (questionList) {
            const temp: IQuestionColumnDef[] = Object.keys(questionList).map((key) => {

                const typedKey = key as keyof InspectionQuestionData;
                // const questionListLength = questionList[typedKey].push({
                //     content: ADDITIONAL_QUESTION,
                //     id: '',
                //     inspection_category: '',
                //     question_order: 999,
                //     is_minor: false
                // });
                const items: InspectionQuestionItem[] = questionList[typedKey];

                return {
                    title: key,
                    questions: items.map((item, index) => {
                        return {
                            questionRender: () => {
                                return (
                                    <div className='question'>
                                        {item.content.split('\\n').map((line, index) => {
                                            return (
                                                <React.Fragment key={index}>
                                                    <div style={{fontSize: 14}}>
                                                        {line}
                                                    </div>

                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                )
                            },
                            answerRender: () => {
                                return (
                                    <div className={`answer ${item.id}`}>
                                        <ul>
                                            <li>
                                                <input type='radio' value='Yes' name={item.id}/>
                                                <label>Yes</label>
                                            </li>
                                            <li>
                                                <input type='radio' value='No' name={item.id}/>
                                                <label>No</label>
                                            </li>

                                            <li>
                                                <input type='radio' name={item.id}/>
                                                <label>NA</label>
                                            </li>
                                        </ul>
                                    </div>
                                )
                            },
                        }
                    })
                }
            });

            setQuestionDef(temp);
        }

    }, [questionList]);


    return (
        <div className='inspection-detail__wrapper'>
            <Card header={inspection?.worksite?.location || ''}>
                <ul className='detail-content'>
                    <li>
                        <span>Section</span>
                        <span>{inspection?.worksite?.section?.name}</span>
                    </li>
                    <li>
                        <span>Contract No.</span>
                        <span>{inspection?.worksite?.contract?.contract_no}</span>
                    </li>
                    <li>
                        <span>Contractor Name</span>
                        <span>{inspection?.worksite?.contractor_name}</span>
                    </li>
                    <li>
                        <span>Work Nature</span>
                        <span></span>
                    </li>
                    <li>
                        <span>Project Officer</span>
                        <span>{inspection?.project_officer?.name} {`[${inspection?.project_officer?.mobile}]`}</span>
                    </li>
                    <li>
                        <span>Supervisor</span>
                        <span>{inspection?.worksite?.supervisor.name} {`[${inspection?.worksite?.supervisor.contact_number}]`}</span>
                    </li>
                    <li>
                        <span>Camera Name</span>
                        <span></span>
                    </li>
                </ul>
            </Card>
            {questionDef?.map((item, index) => {
                return (
                    <Card key={index} header={item.title}>
                        <>
                            {item.questions.map((question, qIndex) => {
                                const Question = question.questionRender;
                                const Answer = question.answerRender;
                                return (
                                    <div key={qIndex} className='question-item'>
                                        <div>
                                            {<Question/>}
                                            {<Answer/>}
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    </Card>
                )
            })}
        </div>
    )
}

export default InspectionDetail;