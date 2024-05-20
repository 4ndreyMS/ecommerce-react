import { Card, CardBody } from "@nextui-org/react";

import React, { ReactNode } from "react";

interface ITemplateProps {
	title: string;
	introMessage: string;
	children: ReactNode;
}

const UserAccessTemplate: React.FC<ITemplateProps> = ({
	title,
	introMessage,
	children,
}) => {
	return (
		<div className="login">
			<div className="login-cont">
				<Card radius="sm" className="w-full max-w-[25rem] ">
					<CardBody className="justify-center">
						<div className="login__intro-cont flex flex-col  items-center">
							<h1>{title}</h1>
							<p>{introMessage}</p>
						</div>
						{children}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default UserAccessTemplate;
