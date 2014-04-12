<?php

namespace Bestyear\UserBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

class BirthdaysCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this
            ->setName('birthdays:send')
            ->setDescription('Send an email to all users that wants to be warn about birthdays.')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // http://fr.openclassrooms.com/forum/sujet/symfony2-un-cron-pour-la-console-sur-ovh-70007
        $now = date_create();
        $em = $this->getContainer()->get('doctrine')->getManager();

        // Users which birthday is today
        $query = $em->createQuery(
                "SELECT u
                FROM BestyearUserBundle:User u
                WHERE DATE_FORMAT(u.birthdate, '%m%d') = DATE_FORMAT(:now, '%m%d')"
            )->setParameter('now', $now);

        $birthdayUsers = $query->getResult();
        $birthdayData = array();
        $nowShort = date('md');
        $nowYear = date('Y');

        if (!empty($birthdayUsers)) {
            foreach ($birthdayUsers as $user) {
                $bdateShort = $user->getBirthdate()->format('md');
                $bdateYear = $user->getBirthdate()->format('Y');
                $age = $bdateShort > $nowShort ? ($nowYear - $bdateYear - 1) : ($nowYear - $bdateYear);
                if ($user->getGender() === "f") {
                    $gender = "female";
                } else {
                    $gender = "male";
                }
                $birthdayData[] = array(
                    "fullname" => $user->getGivenname() . " " . $user->getFamilyName(),
                    "age" => $age,
                    "id" => $user->getId(),
                    "gender" => $gender,
                );
            }

            // Retrieve users that wants daily birthday mails
            $users = $em->getRepository('BestyearUserBundle:User')->getUserWithSettings();

            foreach ($users as $user) {
                $message = \Swift_Message::newInstance()
                    ->setSubject('Anniversaires du jour')
                    ->setFrom(array('no-reply@theotimeloiseau.com' => 'Le Bestyear'))
                    ->setTo($user->getEmail())
                    ->setContentType('text/html')
                    ->setBody($this->getContainer()->get('templating')->render('BestyearUserBundle:Mail:birthdays.html.twig', array('birthdayData' => $birthdayData)))
                ;
                $this->getContainer()->get('mailer')->send($message);
            }
        }
    }
}